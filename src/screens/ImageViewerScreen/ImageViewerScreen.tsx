import React, {memo, useCallback, useEffect, useState} from 'react';
import {View, StatusBar, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import localization from 'localization/localization';
import {MarkerMode, MarkOnImageView, Vector} from 'components/MarkOnImageView';
import {
  getCurrentRoomSelector,
  markerAddedSelector,
} from 'store/reducers/room.reducer';
import Button from 'components/Button/Button';
import Typography from 'components/Typography/Typography';
import Colors from 'theme/Colors';
import CaretLeft from 'images/CaretLeft';
import {createMarker, setMarkerAdded} from 'store/actions/room.actions';
import {getSelectedProject} from 'store/reducers/project.reducer';
import ROUTES from 'navigation/routes';

import {backBtnStyle, bottomContainerStyle, styles} from './styles';

const ImageViewerScreen: React.FC = () => {
  const {params}: any = useRoute();
  const nav = useNavigation();
  const dispatch = useDispatch();
  const markerAdded = useSelector(markerAddedSelector);
  const selectedProj = useSelector(getSelectedProject);
  const room = useSelector(getCurrentRoomSelector);
  const insets = useSafeAreaInsets();
  const [markerMode, setMarkerMode] = useState<MarkerMode>('empty');

  const selectedImage = room?.images.find(i => i.id === params.imageId);

  useEffect(() => {
    if (markerAdded) {
      nav.navigate(
        ROUTES.ADD_PUNCHLIST_ITEM as never,
        {
          withMarker: true,
          imageId: params.imageId,
          id: selectedProj.id,
        } as never,
      );
      dispatch(setMarkerAdded(false));
    }
  }, [markerAdded]);

  const onPress = () => {
    if (markerMode === 'empty') {
      setMarkerMode('in_progress');
    } else if (markerMode === 'in_progress') {
      setMarkerMode('preview');
    }
  };

  const onBack = () => {
    if (markerMode === 'in_progress') {
      setMarkerMode('empty');
    } else {
      nav.goBack();
    }
  };

  const handlePositionchanged = useCallback((c: Vector) => {
    console.log('POSITION in px', c.x + ' - ' + c.y);

    const projectId = selectedProj.id ?? -1;
    const roomId = room?.id ?? -1;
    const imageId = selectedImage?.id ?? -1;

    const payload = {
      projectId,
      roomId,
      imageId,
      x: c.x,
      y: c.y,
    };
    dispatch(createMarker(payload));
    setMarkerMode('empty');
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      {selectedImage && (
        <MarkOnImageView
          image={{uri: selectedImage.image}}
          mode={markerMode}
          onPositionChanged={handlePositionchanged}
        />
      )}

      <TouchableOpacity onPress={onBack} style={backBtnStyle(insets.top)}>
        <CaretLeft />
      </TouchableOpacity>
      <View style={bottomContainerStyle(insets.bottom + 16)}>
        {markerMode === 'in_progress' && (
          <Typography
            type="label"
            text={localization.imageViewerScreen.moveMarker}
            fontColor={Colors.white}
          />
        )}

        <View style={{height: 8}} />
        <Button
          withShadow
          fullWidth
          btnText={
            markerMode === 'empty'
              ? localization.room.addMarker
              : localization.imageViewerScreen.applyMarker
          }
          onPress={onPress}
        />
      </View>
    </View>
  );
};

const MemorizedComponent = memo(ImageViewerScreen);
export {MemorizedComponent as ImageViewerScreen};
