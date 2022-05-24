import React, {FC, useEffect} from 'react';
import {
  Keyboard,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useFormik} from 'formik';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';

import Divider from 'components/Divider/Divider';
import Spacer from 'components/Spacer/Spacer';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import Typography from 'components/Typography/Typography';
import Input from 'components/Input/Input';
import {MainFlowContainer} from 'components/MainFlowContainer';
import {CustomButton} from 'components/CustomButton';
import Album from './Album';
import {editRoom, getRooms, setTabIndex} from 'store/actions/room.actions';
import {
  getCurrentRoomSelector,
  getRoomPhotosSelector,
  getRoomTabIndexSelector,
} from 'store/reducers/room.reducer';
import {setAppLoading, showSuccessModal} from 'store/actions/auth.actions';
import {showRequestErrorMessage} from 'helpers/functions';
import {AddRoomSchema} from 'helpers/validations';
import localization from 'localization/localization';
import {Colors} from 'theme';
import {styles} from './styles';
import appConfig from 'config/appConfig';
import {
  getTemporaryToken,
  getToken,
  showSuccessModalSelector,
} from 'store/reducers/auth.reducer';
import ROUTES from 'navigation/routes';
import {usePrevious} from 'helpers/hooks';
import EventsModal from 'components/EventsModal/EventsModal';

type FormValuesType = {
  name: string;
};

const getSideKey = (index: number) => {
  switch (index) {
    case 0: {
      return 'first_side';
    }
    case 1: {
      return 'second_side';
    }
    case 2: {
      return 'third_side';
    }
    case 3: {
      return 'fourth_side';
    }
    default: {
      return '';
    }
  }
};

const AddRoom: FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const tabIndex = useSelector(getRoomTabIndexSelector);
  const photos = useSelector(getRoomPhotosSelector);
  const token = useSelector(getToken);
  const temporaryToken = useSelector(getTemporaryToken);

  const isModalVisible = useSelector(showSuccessModalSelector);
  const currentRoom = useSelector(getCurrentRoomSelector);
  const previousValue = usePrevious(isModalVisible);

  const [routes] = React.useState([
    {key: 'first', title: '360 Image'},
    {key: 'second', title: 'Static'},
  ]);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: AddRoomSchema,
    onSubmit: async (values: FormValuesType) => {
      Keyboard.dismiss();

      const formData = new FormData();
      formData.append('name', values.name);

      if (tabIndex === 0 && photos['360'].length) {
        photos['360'].forEach(item => {
          formData.append('image', item);
        });
      } else if (tabIndex === 1 && photos.static.length) {
        photos.static.forEach((item, i) => {
          formData.append(getSideKey(i), item);
        });
      }

      const projectId = (route.params as Record<string, number>)?.projectId;

      dispatch(setAppLoading(true));

      if (currentRoom) {
        Promise.all([
          dispatch(editRoom({projectId, roomId: currentRoom.id, data: values})),
        ])
          .then(res => {
            navigation.navigate(
              ROUTES.ROOM as never,
              {
                name: res[0].payload.data.name,
                projectId,
                id: currentRoom.id,
                withBackPress: true,
              } as never,
            );
          })
          .catch(error => {
            showRequestErrorMessage(JSON.stringify(error));
          })
          .finally(() => {
            dispatch(setAppLoading(false));
          });
        return;
      }

      await fetch(
        `${appConfig.baseUrl}/projects/${projectId}/rooms/${
          tabIndex === 0 ? '360' : 'static'
        }/`,
        {
          method: 'POST',
          headers: {
            Authorization: `JWT ${temporaryToken || token}`,
          },
          body: formData,
        },
      )
        .then(async res => {
          const data = await res.json();
          if ((route.params as Record<string, boolean>)?.withSkip) {
            dispatch(showSuccessModal(true));
          } else {
            dispatch(getRooms({projectId}));
            navigation.navigate(
              ROUTES.ROOM as never,
              {...data, projectId, withBackPress: true} as never,
            );
          }
        })
        .catch(error => {
          showRequestErrorMessage(JSON.stringify(error));
        })
        .finally(() => {
          dispatch(setAppLoading(false));
        });
    },
  });

  const handleChangeTabIndex = (index: number) => dispatch(setTabIndex(index));

  const handleSkip = () => {
    dispatch(showSuccessModal(true));
  };

  const handleCloseModal = () => {
    dispatch(showSuccessModal(false));
  };

  const renderScene = SceneMap({
    first: () => (
      <View style={styles.tabContent}>
        <Album type="360" />
      </View>
    ),
    second: () => (
      <View style={styles.tabContent}>
        <Album type="static" />
      </View>
    ),
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabBarIndicator}
      style={styles.tabBar}
      renderLabel={({route: {title}}) => (
        <Text style={styles.tabBarText}>{title}</Text>
      )}
    />
  );

  useEffect(() => {
    return () => {
      dispatch(setTabIndex(0));
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isModalVisible && previousValue) {
      navigation.reset({
        index: 0,
        routes: [{name: ROUTES.SIGN_IN as never}],
      });
    }
  }, [isModalVisible, navigation, previousValue]);

  useEffect(() => {
    if (currentRoom && !formik.values.name) {
      formik.setFieldValue('name', currentRoom?.name);
    }
  }, [currentRoom, formik]);

  return (
    <MainFlowContainer
      title={localization.room.room}
      titleLabel={localization.room[currentRoom ? 'edit' : 'add']}
      withBackButton
    >
      <View style={styles.box}>
        <Spacer height={24} />
        <ViewContainer style={styles.container}>
          <Input
            label={localization.room.label}
            error={!!formik.errors.name && !!formik.touched.name}
            isTouched={!!formik.touched.name}
            placeholder={localization.room.placeholder}
            // onBlur={formik.handleBlur}
            onChange={value => formik.setFieldValue('name', value)}
            value={formik.values.name}
          />
        </ViewContainer>
        <ViewContainer width="100%" height={17.3} style={styles.errorContainer}>
          <Spacer height={5} />
          {!!formik.errors.name && !!formik.touched.name && (
            <Typography
              text={formik.errors.name as any}
              fontColor={Colors.red}
              type="error"
            />
          )}
        </ViewContainer>
        <Spacer height={12} />
        <Divider />
        <View style={styles.tabs}>
          <TabView
            navigationState={{index: tabIndex, routes}}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={handleChangeTabIndex}
            initialLayout={{width: layout.width}}
            style={styles.tabContainer}
          />
          <Spacer height={10} />
          <View style={styles.buttonContainer}>
            <CustomButton
              title={localization.room.saveRoom}
              disabled={
                !formik.isValid ||
                !formik.dirty ||
                !photos[tabIndex === 0 ? '360' : 'static'].length
              }
              onPress={formik.handleSubmit}
              bgColorActive={Colors.orange}
              bgColorUnactive={Colors.gray4}
            />
          </View>
          <Spacer height={30} />
          {(route.params as Record<string, boolean>)?.withSkip && (
            <>
              <View style={styles.bottomRow}>
                <Typography
                  type={'h3'}
                  text={localization.startProject.later + ' '}
                  fontColor={Colors.textGray}
                />
                <TouchableOpacity onPress={handleSkip}>
                  <Typography
                    type={'h3'}
                    text={localization.startProject.skip}
                    fontColor={Colors.orange}
                    underlined
                    style={styles.orangeText}
                  />
                </TouchableOpacity>
              </View>
              <Spacer height={30} />
            </>
          )}
        </View>
      </View>
      <EventsModal
        isShow={isModalVisible}
        onCloseModal={handleCloseModal}
        onFirstButtonPress={handleCloseModal}
        underTitle={localization.startProject.modalTitle}
        title={localization.startProject.modalHeading}
        firstButtonTitle={localization.joinWorkSpace.ok}
      />
    </MainFlowContainer>
  );
};

export default AddRoom;
