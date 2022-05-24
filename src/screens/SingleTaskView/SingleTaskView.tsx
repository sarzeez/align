import React, {FC, Fragment, useEffect, useState} from 'react';
import {MainFlowContainer} from 'components/MainFlowContainer';
import Box from 'components/Box/Box';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import ImageView from 'react-native-image-viewing';
import Spacer from 'components/Spacer/Spacer';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import Typography from 'components/Typography/Typography';
import {Colors} from 'theme';
import {
  getSingleTask,
  chekTaskAsComplete,
  archiveSingleTask,
} from 'store/actions/projects.actions';
import {DEVICE_WIDTH} from 'helpers/constants';
import Carousel from 'react-native-snap-carousel';
import {styles} from './styles';
import {styles as headerStyles} from 'components/Header/styles';
import MenuIcon from 'images/MenuIcon';
import {useActionSheet} from 'components/ActionSheet/ActionSheetProvider';
import {ActionSheetItem} from 'components/ActionSheet/ActionSheet';
import EditIcon from 'images/EditIcon';
import ArchiveIcon from 'images/ArchiveIcon';
import DeleteIcon from 'images/DeleteIcon';
import ROUTES from 'navigation/routes';
import {getSingleTaskSelector} from 'store/reducers/project.reducer';
import {Priority} from 'typings/types.common';
import moment from 'moment';
import BlackCheckbox from 'images/BlackCheckbox';
import shadows from 'theme/Shadows';
import EstimatedCompletion from 'images/EstimatedCompletion';
import RoomLocation from 'images/RoomLocation';
import {showRequestErrorMessage} from '../../helpers/functions';
import AssigneeIcon from 'images/AssigneeIcon';
import localization from 'localization/localization';
import EventsModal from 'components/EventsModal/EventsModal';
import {showSuccessModalSelector} from 'store/reducers/auth.reducer';
import {showSuccessModal} from 'store/actions/auth.actions';
import {ActionSuffix} from 'store/models';
import {deleteSingleTask} from 'store/actions/projects.actions';
import {toggleAssigneesModal} from 'store/actions/projects.actions';
import ChangeAssignment from 'components/ChangeAssignment/ChangeAssignment';

const TaskImages = () => {
  const [isLoadingImg, setIsLoadingImg] = useState(true);
  const singleTask = useSelector(getSingleTaskSelector);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const renderCarouselItem = ({
    item,
  }: {
    item: {image: string; id: number; is_360: boolean};
  }) => (
    <TouchableOpacity style={styles.image} onPress={() => setShowPreview(true)}>
      <Image
        source={{uri: item.image}}
        onLoadEnd={() => setIsLoadingImg(false)}
        style={styles.image}
      />
    </TouchableOpacity>
  );

  //const images = singleTask?.length || singleTask.image.map(item => ({image: item, id: item.id}))
  console.log(singleTask);
  return (
    <>
      <ViewContainer
        style={styles.container}
        flexDirection="row"
        justifyContent="space-between"
      >
        <View style={styles.carousel}>
          <Carousel
            data={[{image: singleTask?.image || singleTask?.file, id: 0}] || []}
            renderItem={renderCarouselItem}
            sliderWidth={DEVICE_WIDTH - 16}
            itemWidth={DEVICE_WIDTH - 16}
            onSnapToItem={slideIndex => setActiveIndex(slideIndex)}
            loop
          />
        </View>

        {isLoadingImg && (
          <ActivityIndicator
            size="small"
            style={styles.indicatorContainerAbsolute}
          />
        )}
      </ViewContainer>
      <Spacer height={12} />
      <ViewContainer style={styles.container}>{}</ViewContainer>
      <ImageView
        images={
          singleTask?.image || singleTask?.file
            ? [{uri: singleTask?.image || singleTask?.file}]
            : []
        }
        imageIndex={0}
        visible={showPreview}
        onRequestClose={() => setShowPreview(false)}
      />
    </>
  );
};

const SingleTaskView: FC = () => {
  const {params}: any = useRoute();
  const {navigate, goBack} = useNavigation();
  const isModalVisible = useSelector(showSuccessModalSelector);
  const [actionType, setActionType] = useState('');
  const dispatch = useDispatch();
  const {setActions, title, setTitle, setIsCenter, isCenter} = useActionSheet();
  const singleTask = useSelector(getSingleTaskSelector);

  const ACTIONS: ActionSheetItem[] = [
    {
      key: singleTask?.task,
      text: singleTask?.task,
      onPress: () => {},
    },
    {
      key: 'edit',
      text: 'Edit Task',
      icon: <EditIcon />,
      onPress: () => {
        setActions([]);
        setTimeout(() => {
          navigate(
            ROUTES.ADD_PUNCHLIST_ITEM as never,
            {projectId: params.projectId, singleTask} as never,
          );
        }, 200);
      },
    },
    {
      key: 'change assignee',
      text: 'Change Assignee',
      icon: <AssigneeIcon />,
      onPress: () => {
        setActions([]);
        dispatch(toggleAssigneesModal(true));
      },
    },
    {
      key: 'archive',
      text: 'Archive Task',
      icon: <ArchiveIcon />,
      onPress: () => {
        setActions([]);
        setActionType('archive');
        dispatch(showSuccessModal(true));
      },
    },
    {
      key: 'delete',
      text: 'Delete Task',
      icon: <DeleteIcon />,
      onPress: () => {
        setActions([]);
        setActionType('delete');
        dispatch(showSuccessModal(true));
      },
    },
  ];

  const handleDeleteTask = async () => {
    try {
      const request = await dispatch(
        deleteSingleTask({
          projectId: params?.projectId,
          roomId: params?.roomId,
          id: params?.id,
        }),
      );
      if (request.type.includes(ActionSuffix.SUCCESS)) {
        dispatch(showSuccessModal(false));
        setTimeout(() => {
          goBack();
        }, 200);
      } else {
        throw new Error(request.type);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleArchiveTask = async () => {
    try {
      const request = await dispatch(
        archiveSingleTask({
          projectId: params?.projectId,
          roomId: params?.roomId,
          id: params?.id,
        }),
      );
      if (request.type.includes(ActionSuffix.SUCCESS)) {
        dispatch(showSuccessModal(false));
        setTimeout(() => {
          goBack();
        }, 200);
      } else {
        throw new Error(request.type);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleCloseModal();
    dispatch(
      getSingleTask({
        projectId: params?.projectId,
        roomId: params?.roomId,
        id: params?.id,
      }),
    );
  }, [dispatch, params]);

  const handleCloseModal = () => {
    dispatch(showSuccessModal(false));
  };

  useEffect(() => {
    setTitle(params.name);
    setIsCenter && setIsCenter(true);
  }, [params, setTitle, title, setIsCenter, isCenter]);

  let priorityColor = Colors.green;

  switch (singleTask?.priority) {
    case 'low':
      priorityColor = Colors.green;
      break;
    case 'medium':
      priorityColor = Colors.orange;
      break;
    default:
      priorityColor = Colors.red;
  }

  const checkAsComplete = () => {
    Promise.all([
      dispatch(
        chekTaskAsComplete({
          projectId: params?.projectId,
          roomId: params?.roomId,
          id: params?.id,
        }),
      ),
    ])
      .then(resp => {
        resp[0]?.error &&
          showRequestErrorMessage(JSON.stringify(resp[0]?.error?.message));
        dispatch(
          getSingleTask({
            projectId: params?.projectId,
            roomId: params?.roomId,
            id: params?.id,
          }),
        );
      })
      .catch(err => console.log(err));
  };

  return (
    <MainFlowContainer
      title={(params as any)?.name}
      withBackButton
      rightComponent={
        <TouchableOpacity
          style={[headerStyles.headBtn, headerStyles.shadowBtn]}
          onPress={() => setActions(ACTIONS)}
        >
          <MenuIcon />
        </TouchableOpacity>
      }
    >
      <View
        style={{
          backgroundColor: Colors.emptyMessageColor,
          flex: 1,
        }}
      >
        <View
          style={{
            paddingLeft: 28,
          }}
        >
          <Spacer height={39} />
          <Typography text={singleTask?.trade?.name} type="h4" />
          <Typography text={singleTask?.task} type="h2" />
          <Spacer height={7} />
          <View
            style={{
              backgroundColor: priorityColor,
              height: 25,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 12,
              paddingTop: 3,
              paddingBottom: 4,
              borderRadius: 8,
              maxWidth: 150,
            }}
          >
            <Typography
              style={{fontFamily: 'Inter-Bold'}}
              type="label"
              text={`Priority ${Priority[singleTask?.priority]}`}
              fontColor={Colors.white}
            />
          </View>
        </View>

        <Spacer height={20} />
        <Box>
          <Spacer height={24} />
          <TaskImages />
          <View
            style={{
              paddingLeft: 58,
            }}
          >
            <Spacer height={39} />
            <Typography
              text="Assignee"
              style={{fontSize: 14, fontFamily: 'Inter-Regular'}}
              fontColor={Colors.gray7}
            />
            <Typography
              text={singleTask?.assignee?.full_name}
              style={{fontSize: 18, fontFamily: 'Inter-Bold'}}
              type="h2"
            />
          </View>
          <Spacer height={39} />
          <View
            style={{
              width: DEVICE_WIDTH - 15,
              marginLeft: 15,
              backgroundColor: Colors.orange,
              height: 78,
              borderRadius: 17,
              flexDirection: 'row',
              ...shadows.sh3,
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.white,
                borderRadius: 16,
                flex: 1,
                borderWidth: 1,
                borderColor: Colors.gray4,
              }}
            >
              <Typography
                text={moment(singleTask?.due_date).format('MMMM D, YYYY ')}
                type="h4"
                style={{fontSize: 16, fontFamily: 'Inter-Bold'}}
              />
              <Spacer height={5} />
              <Typography
                style={{fontSize: 12, fontFamily: 'Inter-Regular'}}
                text={'Due Date'}
                type="h3"
                fontColor={Colors.gray7}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.orange,
                flex: 1,
              }}
            >
              <TouchableOpacity onPress={checkAsComplete}>
                {singleTask?.is_done ? (
                  <BlackCheckbox />
                ) : (
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      backgroundColor: Colors.white,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: Colors.gray4,
                    }}
                  />
                )}
              </TouchableOpacity>
              <Spacer height={2} />
              <Typography
                style={{fontSize: 12, fontFamily: 'Inter-Regular'}}
                text={'Task Complete'}
                type="h3"
                fontColor={Colors.white}
              />
            </View>
          </View>
          <Spacer height={18} />
          <View
            style={{
              flex: 1,
              height: 78,
              backgroundColor: Colors.emptyMessageColor,
              borderRadius: 17,
              marginHorizontal: 15,
              paddingVertical: 13,
              flexDirection: 'row',
            }}
          >
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            >
              <EstimatedCompletion />
              <Spacer height={2} />
              <Typography
                style={{fontSize: 12, fontFamily: 'Inter-Regular'}}
                text={'Task Complete'}
                type="h3"
                fontColor={Colors.gray7}
              />
            </View>
            <View
              style={{width: 1, height: 50, backgroundColor: Colors.gray4}}
            />
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            >
              <Typography
                style={{fontSize: 18, fontFamily: 'Inter-ExtraBold'}}
                text={`${singleTask?.hours} Hours`}
                type="h3"
              />
            </View>
          </View>
          <Spacer height={18} />
          <View
            style={{
              flex: 1,
              height: 78,
              backgroundColor: Colors.emptyMessageColor,
              borderRadius: 17,
              marginHorizontal: 15,
              paddingVertical: 13,
              flexDirection: 'row',
            }}
          >
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            >
              <RoomLocation />
              <Spacer height={2} />
              <Typography
                style={{fontSize: 12, fontFamily: 'Inter-Regular'}}
                text={'Room Location'}
                type="h3"
                fontColor={Colors.gray7}
              />
            </View>
            <View
              style={{width: 1, height: 50, backgroundColor: Colors.gray4}}
            />
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            >
              <Typography
                style={{fontSize: 18, fontFamily: 'Inter-ExtraBold'}}
                text={singleTask?.description}
                type="h3"
              />
            </View>
          </View>
        </Box>
      </View>
      <EventsModal
        isShow={isModalVisible}
        onCloseModal={handleCloseModal}
        onFirstButtonPress={handleCloseModal}
        underTitle={
          actionType === 'delete'
            ? localization.addPunchList.modal.delete.title
            : localization.addPunchList.modal.archive.title
        }
        title={
          actionType === 'delete'
            ? localization.addPunchList.modal.delete.subTitle
            : localization.addPunchList.modal.archive.subTitle
        }
        firstButtonTitle={
          actionType === 'delete'
            ? localization.addPunchList.modal.buttons.notDelete
            : localization.addPunchList.modal.buttons.notArchive
        }
        secondButtonTitle={
          actionType === 'delete'
            ? localization.addPunchList.modal.buttons.delete
            : localization.addPunchList.modal.buttons.archive
        }
        onSecondButtonPress={
          actionType === 'delete' ? handleDeleteTask : handleArchiveTask
        }
        withTwoButtons
      />
      <ChangeAssignment projectId={params.projectId} roomId={params.roomId} taskId={params.id} assignee={singleTask?.id} trade={singleTask?.trade?.id} />
    </MainFlowContainer>
  );
};

export default SingleTaskView;
