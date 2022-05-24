import {useNavigation} from '@react-navigation/native';
import Typography from 'components/Typography/Typography';
import {showRequestErrorMessage} from 'helpers/functions';
import {getHitSlop} from 'helpers/styling';
import CaretLeft from 'images/CaretLeft';
import Lightning from 'images/Lightning';
import React, {FC, useCallback, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Camera,
  TakePhotoOptions,
  TakeSnapshotOptions,
  useCameraDevices,
} from 'react-native-vision-camera';
import {useDispatch, useSelector} from 'react-redux';
import {
  addRoomPhoto,
  setTargetPhotoIndex,
  updateRoomPhoto,
} from 'store/actions/room.actions';
import {
  getRoomPhotosSelector,
  getTargetPhotoIndexSelector,
} from 'store/reducers/room.reducer';
import {Colors} from 'theme';
import {styles} from './styles';

const getTitle = (value: number) => {
  switch (value) {
    case 0:
      return '[ First Side ]';
    case 1:
      return '[ Second Side ]';
    case 2:
      return '[ Third Side ]';
    case 3:
      return '[ Forth Side ]';
  }
};

const CameraScreen: FC = () => {
  const ref = useRef<Camera | null>(null);
  const dispatch = useDispatch();
  const {goBack} = useNavigation();
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
  const photos = useSelector(getRoomPhotosSelector);
  const targetPhotoIndex = useSelector(getTargetPhotoIndexSelector);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lightning, setLightning] = useState<'on' | 'off'>('off');

  const takePhotoOptions = useMemo<TakePhotoOptions & TakeSnapshotOptions>(
    () => ({
      enableAutoStabilization: true,
      photoCodec: 'jpeg',
      qualityPrioritization: 'speed',
      flash: lightning,
      quality: 100,
    }),
    [lightning],
  );

  const takePhoto = useCallback(async () => {
    setIsLoading(true);

    try {
      if (ref.current == null) {
        throw new Error('Camera ref is null!');
      }

      const {path} = await ref.current.takePhoto(takePhotoOptions);

      if (typeof targetPhotoIndex === 'number') {
        dispatch(
          updateRoomPhoto({
            type: 'static',
            index: targetPhotoIndex,
            photo: {
              type: 'image/jpeg',
              uri: path,
              size: null,
              name: path.split('ReactNative/')[1],
            },
          }),
        );
        dispatch(setTargetPhotoIndex(null));
      } else {
        dispatch(
          addRoomPhoto({
            type: 'static',
            data: [
              {
                type: 'image/jpeg',
                uri: path,
                size: null,
                name: path.split('ReactNative/')[1],
              },
            ],
          }),
        );
      }

      if (photos.static.length >= 4) {
        goBack();
      }
    } catch ({message}) {
      showRequestErrorMessage(JSON.stringify(message));
    } finally {
      setIsLoading(false);
    }
  }, [
    dispatch,
    goBack,
    photos.static.length,
    takePhotoOptions,
    targetPhotoIndex,
  ]);

  const toggleLightning = () => {
    setLightning(s => (s === 'off' ? 'on' : 'off'));
  };

  const title = getTitle(photos.static.length);

  return (
    <SafeAreaView style={styles.wrapp}>
      <StatusBar barStyle="light-content" />
      {!device ? (
        <ActivityIndicator style={styles.activityIndicator} size="small" />
      ) : (
        <Camera
          ref={ref}
          device={device}
          photo
          isActive
          style={StyleSheet.absoluteFill}
        />
      )}
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerItem}>
            <TouchableOpacity
              hitSlop={getHitSlop()}
              onPress={() => goBack()}
              style={[styles.headBtn, styles.shadowBtn]}
            >
              <CaretLeft />
            </TouchableOpacity>
          </View>

          <Typography type="h3" text={title} style={styles.title} />

          <View style={styles.headerItem}>
            {photos.static.length ? (
              <TouchableOpacity
                hitSlop={getHitSlop()}
                onPress={() => goBack()}
                style={[styles.headBtn, styles.shadowBtn, styles.primaryBtn]}
              >
                <Typography text="Done" style={styles.btnText} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <View style={styles.captureBtnWrapp}>
          <TouchableOpacity
            style={[
              styles.captureBtn,
              ((typeof targetPhotoIndex !== 'number' &&
                photos.static.length >= 4) ||
                isLoading) &&
                styles.captureBtnDisabled,
            ]}
            onPress={takePhoto}
            disabled={
              (typeof targetPhotoIndex !== 'number' &&
                photos.static.length >= 4) ||
              isLoading
            }
          />
        </View>

        <TouchableOpacity
          style={styles.lightningBtn}
          onPress={toggleLightning}
          disabled={
            (typeof targetPhotoIndex !== 'number' &&
              photos.static.length >= 4) ||
            isLoading
          }
        >
          <Lightning
            color={lightning === 'on' ? Colors.orange : Colors.white}
            stroke={lightning === 'on' ? 'transparent' : Colors.white}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CameraScreen;
