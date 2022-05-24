import React, {FC, memo, useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'components/ImagePicker/ImagePicker';
import DeleteIcon from 'images/DeleteIcon';
import {File, Pickers} from 'typings/types.common';
import CameraIcon from 'images/CameraIcon';
import {Colors} from 'theme';
import {styles} from './styles';

type PhotoProps = File & {
  onDelete?: () => void;
  onReTake?: (file: File) => void;
  onView: () => void;
  onOpenCamera?: () => void;
  large?: boolean;
};

const Photo: FC<PhotoProps> = ({
  uri,
  onDelete,
  onReTake,
  onView,
  onOpenCamera,
  large,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <TouchableOpacity
      style={[large ? styles.photoContainerLg : styles.photoContainer]}
      onPress={onView}
    >
      {onReTake && (
        <View style={{position: 'absolute', zIndex: 1000}}>
          <ImagePicker
            actions={
              large
                ? [Pickers.Photos, Pickers.Documents]
                : [Pickers.Photos, Pickers.Documents, Pickers.Camera]
            }
            icon={
              <View
                style={[large ? styles.retakeButtonLg : styles.retakeButton]}
              >
                <CameraIcon
                  color={Colors.white}
                  style={{left: large ? 0 : -10}}
                />
              </View>
            }
            onSelectFile={onReTake}
            onOpenCamera={onOpenCamera}
          />
        </View>
      )}
      {onDelete && (
        <TouchableOpacity
          style={[large ? styles.deleteButtonLg : styles.deleteButton]}
          onPress={onDelete}
        >
          <DeleteIcon color={large ? Colors.black : Colors.white} />
        </TouchableOpacity>
      )}
      <Image
        source={{uri}}
        style={[large ? styles.photoLg : styles.photo]}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && (
        <ActivityIndicator size="small" style={styles.activityIndicator} />
      )}
    </TouchableOpacity>
  );
};

export default memo(Photo);
