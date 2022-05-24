import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImageView from 'react-native-image-viewing';
import Spacer from 'components/Spacer/Spacer';
import Typography from 'components/Typography/Typography';
import ImagePicker from 'components/ImagePicker/ImagePicker';
import {useActionSheet} from 'components/ActionSheet/ActionSheetProvider';
import localization from 'localization/localization';
import Photo from './Photo';
import DeleteIcon from 'images/DeleteIcon';
import CameraIconFilled from 'images/CameraIconFilled';
import {File, Pickers} from 'typings/types.common';
import {
  addRoomPhoto,
  deleteRoomPhoto,
  setTargetPhotoIndex,
  updateRoomPhoto,
} from 'store/actions/room.actions';
import {
  getCurrentRoomSelector,
  getRoomPhotosSelector,
} from 'store/reducers/room.reducer';
import {Colors} from 'theme';
import {styles} from './styles';

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
          icon={<CameraIconFilled />}
          onSelectFile={onPress}
        />
        <Spacer height={16} />
        <Typography style={styles.placeholderLabel} text={label} type="body" />
      </View>
    </View>
  );
};

const Album: FC<{type: '360' | 'static'}> = ({type}) => {
  const [indexToDelete, setIndexToDelete] = useState<number | null>(null);
  const {actions, setActions, setTitle} = useActionSheet();
  const [showPreview, setShowPreview] = useState<number | null>(null);
  const dispatch = useDispatch();
  const photos = useSelector(getRoomPhotosSelector);
  const currentRoom = useSelector(getCurrentRoomSelector);

  const handleAddRoomPhoto = (file: File) => {
    dispatch(addRoomPhoto({type, data: [file]}));
  };

  const handleDeleteRoomPhoto = () => {
    if (typeof indexToDelete === 'number') {
      dispatch(deleteRoomPhoto({type, index: indexToDelete}));
      setIndexToDelete(null);
      setActions([]);
    }
  };

  const ACTIONS = [
    {
      key: 'delete',
      text: 'Delete',
      icon: <DeleteIcon color={Colors.black} width={30} />,
      onPress: handleDeleteRoomPhoto,
    },
  ];

  useEffect(() => {
    if (typeof indexToDelete === 'number') {
      setActions(ACTIONS);
      setTitle(localization.actionSheet.delete.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexToDelete]);

  useEffect(() => {
    if (!actions.length) {
      setIndexToDelete(null);
    }
  }, [actions]);

  if (!photos[type].length) {
    return (
      <Placeholder
        type={type}
        label={localization.room.addPhotoPlaceholder}
        onPress={photo => dispatch(addRoomPhoto({type, data: [photo]}))}
      />
    );
  }

  return (
    <View style={[styles.boxSm, type === 'static' && styles.container]}>
      {type === '360' ? (
        <>
          {photos[type].map((item, i) => (
            <Photo
              key={i}
              {...item}
              onDelete={currentRoom ? undefined : () => setIndexToDelete(i)}
              onReTake={
                currentRoom
                  ? undefined
                  : photo => {
                      dispatch(setTargetPhotoIndex(i));
                      dispatch(updateRoomPhoto({type, photo, index: i}));
                    }
              }
              onView={() => setShowPreview(i)}
              large
            />
          ))}
        </>
      ) : (
        <>
          <Spacer height={16} />
          <View style={styles.titleWrapp}>
            <Typography type="h2" text={localization.room[type].title} />

            {photos[type].length < 4 && (
              <ImagePicker
                actions={[
                  Pickers.Photos,
                  Pickers.Documents,
                  type === 'static' && Pickers.Camera,
                ]}
                icon={<CameraIconFilled />}
                onSelectFile={handleAddRoomPhoto}
              />
            )}
          </View>
          <Spacer height={8} />
          <Typography
            type="h4"
            text={localization.room[type].subtitle}
            style={styles.albumText}
          />
          <Spacer height={16} />
          <View style={styles.albumGrid}>
            {photos[type].map((item, i) => (
              <Photo
                key={i}
                {...item}
                onDelete={currentRoom ? undefined : () => setIndexToDelete(i)}
                onReTake={
                  currentRoom
                    ? undefined
                    : photo => {
                        dispatch(setTargetPhotoIndex(i));
                        dispatch(updateRoomPhoto({type, photo, index: i}));
                      }
                }
                onOpenCamera={() => {
                  dispatch(setTargetPhotoIndex(i));
                }}
                onView={() => setShowPreview(i)}
              />
            ))}
          </View>
        </>
      )}

      <ImageView
        images={photos[type].map(({uri}) => ({uri}))}
        imageIndex={showPreview || 0}
        visible={typeof showPreview === 'number'}
        onRequestClose={() => setShowPreview(null)}
      />
    </View>
  );
};

export default memo(Album);
