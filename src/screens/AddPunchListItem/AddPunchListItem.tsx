import React, {FC, useEffect, useState} from 'react';
import {Keyboard, View, ScrollView} from 'react-native';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import Box from 'components/Box/Box';
import shadows from 'theme/Shadows';
import {useNavigation} from '@react-navigation/native';

import ImagePicker from 'components/ImagePicker/ImagePicker';
import CalendarModal from 'components/CalendarModal/CalendarModal';
import DropDown from 'components/DropDown/DropDown';
import Spacer from 'components/Spacer/Spacer';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import Typography from 'components/Typography/Typography';
import Input from 'components/Input/Input';
import {MainFlowContainer} from 'components/MainFlowContainer';
import {CustomButton} from 'components/CustomButton';
import EventsModal from 'components/EventsModal/EventsModal';
import {
  clearPhotos,
  getRooms,
  setTabIndex,
  setTargetPhotoIndex,
  updateMarker,
  updateRoomPhoto,
} from 'store/actions/room.actions';
import DocumentIcon from 'images/DocumentIcon';
import {
  getCurrentRoomSelector,
  getRoomPhotosSelector,
  getRoomsSelector,
  getRoomTabIndexSelector,
} from 'store/reducers/room.reducer';
import {setAppLoading, showSuccessModal} from 'store/actions/auth.actions';
import {getToken, showSuccessModalSelector} from 'store/reducers/auth.reducer';
import {AddPunchListItemSchema} from 'helpers/validations';
import localization from 'localization/localization';
import {File, Pickers} from 'typings/types.common';
import {Colors} from 'theme';
import {styles} from './styles';
import {getMessagesUsers} from 'store/actions/user.actions';
import {getTrades} from 'store/actions/projects.actions';
import {getTradesListSelector} from 'store/reducers/project.reducer';
import {getMyWorkspaceSelector} from 'store/reducers/workspace.reducer';
import {getMessagesUsersSelector} from 'store/reducers/profile.reducer';
import {useRoute} from '@react-navigation/native';
import appConfig from 'config/appConfig';
import {showRequestErrorMessage} from 'helpers/functions';
import Photo from '../AddRoom/Photo';
import ImageView from 'react-native-image-viewing';
import AddImageIcon from 'images/AddImageIcon';
import {usePrevious} from 'helpers/hooks';
import {MarkOnImageView} from 'components/MarkOnImageView';
import {Marker} from 'store/reducers/types';

type PlaceholderProps = {
  type: '360' | 'static';
  label: string;
  onPress: (file: File) => void;
};

const Placeholder: FC<PlaceholderProps> = ({type, label, onPress}) => {
  return (
    <View style={styles.box}>
      <View style={styles.placeholderContainer}>
        <ImagePicker
          actions={[
            Pickers.Photos,
            Pickers.Documents,
            ...(type === 'static' ? [Pickers.Camera] : []),
          ]}
          icon={<AddImageIcon />}
          onSelectFile={onPress}
        />
        <Typography style={styles.placeholderLabel} text={label} type="body" />
      </View>
    </View>
  );
};

const PRIORITY_TYPES = [
  {label: 'Low', value: 'low'},
  {label: 'Medium', value: 'medium'},
  {label: 'High', value: 'high'},
];

const ORDER_TYPES = [
  {label: 'Yes', value: 'yes'},
  {label: 'No', value: 'no'},
];

type FormValuesType = {
  task: string;
  trade: string;
  hours: string;
  priority: string;
  room: string;
  due_date: string;
  assignee?: string;
  change_order: string;
  description?: string;
  file?: File | null;
  image?: File | null;
};

type AddPunchListItemProps = {
  withSkip?: boolean;
};

const AddPunchListItem: FC<AddPunchListItemProps> = () => {
  const navigation = useNavigation();
  const {params} = useRoute();

  const dispatch = useDispatch();
  const selectedRoom = useSelector(getCurrentRoomSelector);
  const tabIndex = useSelector(getRoomTabIndexSelector);
  const photos = useSelector(getRoomPhotosSelector);
  const rooms = useSelector(getRoomsSelector);
  const currentWorkspace = useSelector(getMyWorkspaceSelector);
  const trades = useSelector(getTradesListSelector);
  const messagesUsers = useSelector(getMessagesUsersSelector);
  const workspaceId = currentWorkspace?.id;
  const token = useSelector(getToken);
  const projectId = (params as any)?.id;
  const singleTask = (params as any)?.singleTask;
  const isModalVisible = useSelector(showSuccessModalSelector);
  const [images, setImages] = useState([]);
  const [showPreview, setShowPreview] = useState<number | null>(null);
  const previousIsVisible = usePrevious(isModalVisible);

  const selectedImage = selectedRoom?.images.find(
    i => i.id === (params as any)?.imageId,
  );

  const [isCalendarModalVisible, setCalendarModalVisible] =
    useState<boolean>(false);

  const updateMarkerIfNeeded = (punchListItemId: number) => {
    const marker = getMarker(selectedImage);
    if (selectedImage && marker) {
      const payload = {
        id: marker.id,
        projectId: marker.project_id,
        roomId: marker.room_id,
        imageId: selectedImage.id,
        data: {
          punchListItemId,
          x: marker.x,
          y: marker.y,
        },
      };
      dispatch(updateMarker(payload));
    }
  };

  const formik = useFormik({
    initialValues: {
      image:
        singleTask?.image || singleTask?.image
          ? singleTask?.image || singleTask?.file
          : '',
      task: singleTask?.task ? singleTask?.task : '',
      trade: singleTask?.trade ? singleTask?.trade?.name : '',
      hours: singleTask?.hours ? singleTask?.hours : '',
      priority: singleTask?.priority ? singleTask?.priority : '',
      room: singleTask?.room ? singleTask?.room : '',
      due_date: singleTask?.due_date ? singleTask?.due_date : '',
      assignee: singleTask?.assignee ? singleTask?.assignee.user_id : '',
      change_order: singleTask?.change_order ? singleTask?.change_order : '',
      description: singleTask?.description ? singleTask?.description : '',
      file: singleTask?.file ? singleTask?.file : null,
    },
    validationSchema: AddPunchListItemSchema,
    onSubmit: async (values: FormValuesType) => {
      Keyboard.dismiss();
      const formData = new FormData();
      formData.append('trade', Number(values.trade));
      formData.append('task', values.task);
      formData.append('hours', values.hours);
      formData.append('priority', values.priority);
      formData.append('due_date', values.due_date);
      formData.append('assignee', values.assignee);
      formData.append('change_order', values.change_order);
      formData.append('description', values.description);
      if (images.length) {
        formData.append('image', images);
      }
      if (values.file) {
        formData.append('file', values.file);
      }
      dispatch(setAppLoading(true));

      // TODO: why isn't this call wrapped into action ???

      await fetch(
        `${appConfig.baseUrl}/projects/${projectId}/rooms/${Number(
          values.room,
        )}/punch_lists/upload/`,
        {
          method: 'POST',
          headers: {
            Authorization: `JWT ${token}`,
          },
          body: formData,
        },
      )
        .then(async res => {
          console.log('RES', JSON.stringify(res));
          const data = await res.json();
          console.log('PUNCH ITEM', JSON.stringify(data));
          if (!res.ok) {
            throw new Error(data);
          } else {
            // TODO : update redux store with newly created item
            updateMarkerIfNeeded(data.id);
          }

          dispatch(showSuccessModal(true));
        })
        .catch(error => {
          showRequestErrorMessage(JSON.stringify(error));
        })
        .finally(() => {
          dispatch(setAppLoading(false));
        });
    },
  });

  const handleCloseModal = () => {
    dispatch(showSuccessModal(false));
  };

  const handleImages = (image: any) => {
    const newImageList = [...images, image];
    setImages(newImageList as never);
  };

  const deleteImage = (image: any) => {
    const newImageList = images.filter(item => image?.uri !== item?.uri);
    setImages(newImageList as never);
  };

  useEffect(() => {
    return () => {
      dispatch(clearPhotos());
      dispatch(setTabIndex(0));
    };
  }, [dispatch]);

  useEffect(() => {
    workspaceId && dispatch(getMessagesUsers(workspaceId));
    dispatch(getTrades(workspaceId));
  }, [dispatch, workspaceId]);

  const assignees =
    (messagesUsers?.length &&
      messagesUsers?.map((item: any) => ({
        value: String(item.id),
        label: item.full_name,
      }))) ||
    [];

  useEffect(() => {
    if (previousIsVisible && !isModalVisible) {
      navigation.goBack();
    }
  }, [previousIsVisible, isModalVisible]);

  const getMarker = (selectedImage: any): Marker | undefined => {
    if (selectedImage && selectedImage.markers.length > 0) {
      const lastMarker =
        selectedImage.markers[selectedImage.markers.length - 1];
      return lastMarker as Marker;
    }
  };

  const markerVector = () => {
    const marker = getMarker(selectedImage);
    if (marker) {
      return {x: marker.x, y: marker.y};
    } else {
      return {x: 0, y: 0};
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.keyboardView}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewStyle}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
      >
        <MainFlowContainer
          title={localization.addPunchList.title}
          titleLabel={localization.addPunchList.titleLabel}
          withBackButton
          scrollEnabled
        >
          <ScrollView
            scrollEnabled={false}
            contentContainerStyle={styles.scrollViewStyle}
            keyboardShouldPersistTaps="handled"
            horizontal
          >
            <Box>
              <ViewContainer style={{...styles.container, zIndex: 4}}>
                <Spacer height={24} />
                {(params as any)?.withMarker ? (
                  <View style={styles.markerImageContainer}>
                    <MarkOnImageView
                      image={selectedImage ? {uri: selectedImage.image} : null}
                      mode={selectedImage ? 'preview' : 'empty'}
                      coordinates={markerVector()}
                    />
                  </View>
                ) : (
                  <View>
                    <Typography
                      text="Image Upload"
                      fontColor={Colors.bodyBase}
                      type="label"
                    />
                    <Spacer height={9} />
                    <Placeholder
                      onPress={handleImages}
                      type="static"
                      label="Tap here to upload image"
                    />
                    <View style={styles.albumGrid}>
                      {images.map((item, i) => (
                        <Photo
                          key={i}
                          {...item}
                          onDelete={() => deleteImage(item)}
                          onView={() => setShowPreview(i)}
                        />
                      ))}
                    </View>
                  </View>
                )}
                <Spacer height={24} />

                <View style={{...shadows.sh3, flex: 1}}>
                  <DropDown
                    options={trades.map(item => ({
                      label: item.trade,
                      value: item.id,
                    }))}
                    labelProps={{text: formik.values.trade}}
                    error={formik.errors.trade}
                    onOpen={() => {
                      formik.handleBlur('trade');
                      formik.handleChange('trade');
                    }}
                    value={formik.values.trade}
                    label={localization.addPunchList.form.trade}
                    placeholder={localization.addPunchList.form.trade}
                    onSetItem={({value}) => {
                      formik.handleChange('trade');
                      formik.setFieldValue('trade', value);
                    }}
                  />
                  <ViewContainer
                    width="100%"
                    height={27.3}
                    style={styles.errorContainer}
                  >
                    <Spacer height={5} />
                    {!!formik.errors.trade && (
                      <Typography
                        text={formik.errors.trade}
                        fontColor={Colors.red}
                        type="error"
                      />
                    )}
                  </ViewContainer>
                </View>
              </ViewContainer>
              <Spacer height={12} />
              <ViewContainer style={styles.container}>
                <View style={{...shadows.sh3}}>
                  <Input
                    label={localization.addPunchList.form.task}
                    error={!!formik.errors.task && !!formik.touched.task}
                    isTouched={!!formik.touched.task}
                    placeholder={localization.addPunchList.form.task}
                    onChange={value => {
                      formik.handleChange('task');
                      formik.setFieldValue('task', value);
                    }}
                    value={formik.values.task}
                    onBlur={formik.handleBlur('task')}
                  />
                </View>
                <ViewContainer
                  width="100%"
                  height={17.3}
                  style={styles.errorContainer}
                >
                  <Spacer height={5} />
                  {!!formik.errors.task && !!formik.touched.task && (
                    <Typography
                      text={formik.errors.task}
                      fontColor={Colors.red}
                      type="error"
                    />
                  )}
                </ViewContainer>
              </ViewContainer>
              <Spacer height={12} />
              <ViewContainer style={styles.container}>
                <View style={{...shadows.sh3}}>
                  <Input
                    label={localization.addPunchList.form.hours}
                    error={!!formik.errors.hours && !!formik.touched.hours}
                    isTouched={!!formik.touched.hours}
                    placeholder={`${localization.addPunchList.form.hours} Hours`}
                    onChange={value => {
                      formik.handleChange('hours');
                      formik.setFieldValue('hours', value);
                    }}
                    value={formik.values.hours}
                    onBlur={formik.handleBlur('hours')}
                    keyBoardType="numeric"
                  />
                </View>
                <ViewContainer
                  width="100%"
                  height={17.3}
                  style={styles.errorContainer}
                >
                  <Spacer height={5} />
                  {!!formik.errors.hours && !!formik.touched.hours && (
                    <Typography
                      text={formik.errors.hours}
                      fontColor={Colors.red}
                      type="error"
                    />
                  )}
                </ViewContainer>
              </ViewContainer>
              <Spacer height={12} />
              <View style={{...styles.container, zIndex: 3}}>
                <ViewContainer flex={1}>
                  <View style={{...shadows.sh2}}>
                    <DropDown
                      containerStyle={{}}
                      options={PRIORITY_TYPES}
                      value={formik.values.priority}
                      label={localization.addPunchList.form.priority}
                      onSetItem={({value}) =>
                        formik.setFieldValue('priority', value)
                      }
                    />
                  </View>
                  <ViewContainer
                    width="100%"
                    height={17.3}
                    style={styles.errorContainer}
                  >
                    <Spacer height={5} />
                    {!!formik.errors.priority && !!formik.touched.priority && (
                      <Typography
                        text={formik.errors.priority}
                        fontColor={Colors.red}
                        type="error"
                      />
                    )}
                  </ViewContainer>
                </ViewContainer>
              </View>
              <Spacer height={12} />
              <ViewContainer style={{...styles.container, zIndex: 2}}>
                <ViewContainer flex={1} height={80}>
                  <DropDown
                    options={rooms.results.map(item => ({
                      value: String(item.id),
                      label: item.name,
                    }))}
                    value={formik.values.room}
                    label={localization.addPunchList.form.room}
                    onSetItem={({value}) => formik.setFieldValue('room', value)}
                  />
                  <ViewContainer
                    width="100%"
                    height={17.3}
                    style={styles.errorContainer}
                  >
                    <Spacer height={5} />
                    {!!formik.errors.room && !!formik.touched.room && (
                      <Typography
                        text={formik.errors.room}
                        fontColor={Colors.red}
                        type="error"
                      />
                    )}
                  </ViewContainer>
                </ViewContainer>
              </ViewContainer>
              <Spacer height={12} />
              <ViewContainer style={styles.container}>
                <View style={{...shadows.sh2}}>
                  <Input
                    label={localization.addPunchList.form.dueDate}
                    error={
                      !!formik.errors.due_date && !!formik.touched.due_date
                    }
                    // isTouched={!!formik.touched.due_date}
                    placeholder={localization.addPunchList.form.dueDate}
                    onChange={value => {
                      formik.handleChange('due_date');
                      formik.setFieldValue('due_date', value);
                    }}
                    value={formik.values.due_date}
                    onFocus={() => {
                      setCalendarModalVisible(true);
                    }}
                    onBlur={() => formik.handleBlur('due_date')}
                    fakeInput
                  />
                </View>
                <ViewContainer
                  width="100%"
                  height={17.3}
                  style={styles.errorContainer}
                >
                  <Spacer height={5} />
                  {!!formik.errors.due_date && !!formik.touched.due_date && (
                    <Typography
                      text={formik.errors.due_date}
                      fontColor={Colors.red}
                      type="error"
                    />
                  )}
                </ViewContainer>
              </ViewContainer>
              <Spacer height={12} />
              <ViewContainer style={{...styles.container, zIndex: 2}}>
                <ViewContainer flex={1} height={80}>
                  <DropDown
                    options={assignees}
                    value={formik.values.assignee}
                    label={localization.addPunchList.form.assignee}
                    onSetItem={({value}) =>
                      formik.setFieldValue('assignee', value)
                    }
                  />
                  <ViewContainer
                    width="100%"
                    height={17.3}
                    style={styles.errorContainer}
                  >
                    <Spacer height={5} />
                    {!!formik.errors.assignee && !!formik.touched.assignee && (
                      <Typography
                        text={formik.errors.assignee}
                        fontColor={Colors.red}
                        type="error"
                      />
                    )}
                  </ViewContainer>
                </ViewContainer>
              </ViewContainer>
              <Spacer height={12} />
              <ViewContainer style={{...styles.container, zIndex: 1}}>
                <ViewContainer flex={1} height={80}>
                  <DropDown
                    options={ORDER_TYPES}
                    value={formik.values.change_order}
                    label={localization.addPunchList.form.changeOrder}
                    onSetItem={({value}) =>
                      formik.setFieldValue('change_order', value)
                    }
                  />
                  <ViewContainer
                    width="100%"
                    height={17.3}
                    style={styles.errorContainer}
                  >
                    <Spacer height={5} />
                    {!!formik.errors.change_order &&
                      !!formik.touched.change_order && (
                        <Typography
                          text={formik.errors.change_order}
                          fontColor={Colors.red}
                          type="error"
                        />
                      )}
                  </ViewContainer>
                </ViewContainer>
              </ViewContainer>
              <Spacer height={12} />
              <ViewContainer style={styles.container}>
                <View style={{...shadows.sh2}}>
                  <Input
                    label={localization.addPunchList.form.description}
                    error={
                      !!formik.errors.description &&
                      !!formik.touched.description
                    }
                    isTouched={!!formik.touched.description}
                    onChange={value =>
                      formik.setFieldValue('description', value)
                    }
                    value={formik.values.description}
                    multiline={true}
                    numberOfLines={10}
                    inputStyle={{height: 150}}
                    containerStyle={{height: 150}}
                  />
                </View>
              </ViewContainer>
              <Spacer height={12} />
              <ViewContainer style={styles.container}>
                <Typography
                  text={localization.addPunchList.form.file}
                  fontColor={Colors.bodyBase}
                  type="label"
                />
                <Spacer height={12} />
                <View style={styles.uploadFileContainer}>
                  <ImagePicker
                    actions={[Pickers.Documents]}
                    actionSheetTitle={
                      localization.addPunchList.actionSheetTitle
                    }
                    onSelectFile={file => formik.setFieldValue('file', file)}
                    icon={<DocumentIcon color={Colors.gray10} />}
                    label={
                      formik.values.file
                        ? (formik.values.file as File).name
                        : '' || localization.addPunchList.uploadFilePlaceholder
                    }
                  />
                </View>
              </ViewContainer>
              <Spacer height={24} />

              <View>
                <Spacer height={10} />
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title={localization.room.saveRoom}
                    disabled={!formik.isValid || !formik.dirty}
                    onPress={formik.handleSubmit}
                    bgColorActive={Colors.orange}
                    bgColorUnactive={Colors.gray4}
                  />
                </View>
                <Spacer height={30} />
              </View>
            </Box>
          </ScrollView>
          <EventsModal
            isShow={isModalVisible}
            onCloseModal={handleCloseModal}
            onFirstButtonPress={handleCloseModal}
            title={localization.changePassword.success}
            underTitle={'Your punch list item was successfully created!'}
            firstButtonTitle={localization.joinWorkSpace.ok}
          />
          <CalendarModal
            dateFormat="YYYY-MM-DD"
            isVisible={isCalendarModalVisible}
            onClose={() => setCalendarModalVisible(false)}
            onSetDate={date => formik.setFieldValue('due_date', date)}
          />
          <ImageView
            images={images.map(({uri}) => ({uri}))}
            imageIndex={showPreview || 0}
            visible={typeof showPreview === 'number'}
            onRequestClose={() => setShowPreview(null)}
          />
        </MainFlowContainer>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default AddPunchListItem;
