import React, {FC, ReactNode, useCallback, useEffect, useState} from 'react';
import {AppState, Keyboard, TouchableOpacity} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {useSelector, useDispatch} from 'react-redux';
import CameraIcon from 'images/CameraIcon';
import {showRequestErrorMessage} from 'helpers/functions';
import {useActionSheet} from 'components/ActionSheet/ActionSheetProvider';
import Spacer from 'components/Spacer/Spacer';
import {styles} from './styles';
import {IS_IOS} from 'helpers/constants';
import {PermissionsStatuses, Pickers} from 'typings/types.common';
import localization from 'localization/localization';
import ImageIcon from 'images/ImageIcon';
import DocumentIcon from 'images/DocumentIcon';
import Colors from 'theme/Colors';
import {getAccessSelector} from 'store/reducers/accesses.reducer';
import {addAccess} from 'store/actions/access.actions';
import {usePermission} from 'helpers/hooks';
import {useNavigation} from '@react-navigation/native';
import ROUTES from 'navigation/routes';
import {ActionSheetItem} from 'components/ActionSheet/ActionSheet';
import AccessModal from 'components/AccessModal/AccessModal';
import Typography from 'components/Typography/Typography';

export type File = {
  name: string | undefined;
  size: number | null | undefined;
  type: string | null | undefined;
  uri: string | undefined;
};

type ImagePickerProps = {
  actionSheetTitle?: string;
  label?: string;
  onSelectFile: (file: File) => void;
  onPressPicker?: () => void;
  icon: ReactNode;
  actions?: any[];
  cameraType?: 'multiple' | 'single';
  onOpenCamera?: () => void;
};

const EVENT_APP_STATE = 'change';

const validateFile = (file: File) => {
  if (!file.type || !file.size) {
    return;
  }

  if (
    !['image/jpeg', 'image/jpg', 'image/png', 'image/heic'].includes(file.type)
  ) {
    return 'Unsupported format.';
  }
};

const ImagePicker: FC<ImagePickerProps> = ({
  actionSheetTitle,
  label,
  onSelectFile,
  onPressPicker,
  onOpenCamera,
  cameraType = 'multiple',
  icon,
  actions = [Pickers.Photos, Pickers.Documents, Pickers.Camera],
}) => {
  const navigation = useNavigation();
  const {setActions, setTitle} = useActionSheet();
  const access = useSelector(getAccessSelector);
  const {checkPermission} = usePermission();
  const dispatch = useDispatch();
  const [showAccessModal, setToShowAccessModal] = useState(false);

  const ACTIONS = actions.map(item => {
    switch (item) {
      case Pickers.Photos: {
        return {
          key: Pickers.Photos,
          text: 'Photo Library',
          icon: (
            <ImageIcon
              color={Colors.black}
              width={30}
              height={40}
              style={{top: 4, left: 5, marginRight: -1}}
            />
          ),
          onPress: async () => {
            openPicker(Pickers.Photos);
          },
        };
      }
      case Pickers.Documents: {
        return {
          key: Pickers.Documents,
          text: 'Document Library',
          icon: (
            <DocumentIcon
              color={Colors.black}
              width={20}
              height={40}
              style={{marginRight: 8, top: 0, left: 5}}
            />
          ),
          onPress: () => {
            openPicker(Pickers.Documents);
          },
        };
      }
      case Pickers.Camera: {
        return {
          key: Pickers.Camera,
          text: 'Camera',
          icon: (
            <CameraIcon
              color={Colors.black}
              width={46}
              height={50}
              style={{
                marginLeft: -7,
                marginRight: -10,
                marginTop: -6,
                marginBottom: -6,
              }}
            />
          ),
          onPress: () => {
            openPicker(Pickers.Camera);
          },
        };
      }
    }
  });

  const onAppChangeCallback = useCallback(
    (state: string) => {
      if (state === 'active' && IS_IOS) {
        checkPermission(Pickers.Photos, {request: false}).then(() => {
          if (access.photos === PermissionsStatuses.granted) {
            dispatch(addAccess(access.photos as any));
          }
        });

        checkPermission(Pickers.Camera, {request: false}).then(() => {
          if (access.camera === PermissionsStatuses.granted) {
            dispatch(addAccess(access.camera as any));
          }
        });
      }
    },
    [access.camera, access.photos, checkPermission, dispatch],
  );

  const selectFile = async (key: string | number) => {
    try {
      if (key === Pickers.Photos) {
        const res = await launchImageLibrary({
          mediaType: 'mixed',
          maxWidth: 2000,
          maxHeight: 2000,
        });

        if (res.assets?.length) {
          const file = {
            name:
              res.assets[0].fileName ||
              res.assets[0].uri?.split('/')[
                res.assets[0].uri?.split('/').length - 1
              ],
            size: res.assets[0].fileSize,
            type: res.assets[0].type,
            uri: res.assets[0].uri,
          };

          const error = validateFile(file);

          if (error) {
            throw error;
          }

          onSelectFile(file);
        }
      } else if (key === Pickers.Documents) {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });

        const file = {
          name: res[0].name || 'undefined',
          size: res[0].size,
          type: res[0].type,
          uri: res[0].uri,
        };
        const error = validateFile(file);

        if (error) {
          throw error;
        }

        onSelectFile(file);
      } else if (key === Pickers.Camera) {
        if (cameraType === 'single') {
          const res = await launchCamera({
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
          });
          if (res.assets?.length) {
            const file = {
              name:
                res.assets[0].fileName ||
                res.assets[0].uri?.split('/')[
                  res.assets[0].uri?.split('/').length - 1
                ],
              size: res.assets[0].fileSize,
              type: res.assets[0].type,
              uri: res.assets[0].uri,
            };
            onSelectFile(file);
          }
        } else {
          if (onOpenCamera) {
            onOpenCamera();
          }
          navigation.navigate(ROUTES.CAMERA as never);
        }
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        showRequestErrorMessage(String(err));
      }
    }
  };

  const openPicker = async (key: string) => {
    Keyboard.dismiss();
    setActions([]);
    if (!(access as any)[key]) {
      const res = await checkPermission(key);

      if (res) {
        dispatch(addAccess(key));
        selectFile(key);
      } else {
        setToShowAccessModal(true);
      }
    } else if ((access as any)[key] === PermissionsStatuses.granted) {
      selectFile(key);
    }
  };

  useEffect(() => {
    AppState.addEventListener(EVENT_APP_STATE, onAppChangeCallback);
  }, [onAppChangeCallback]);

  return (
    <>
      <TouchableOpacity
        style={styles.picker}
        onPress={() => {
          if (onPressPicker) {
            onPressPicker();
          }
          setTitle(
            actionSheetTitle || localization.actionSheet.uploadPhoto.title,
          );
          setActions(ACTIONS as ActionSheetItem[]);
        }}
      >
        {icon}
        {label && (
          <>
            <Spacer height={6} />
            <Typography
              textCenter
              text={label}
              type="label"
              fontColor={Colors.gray9}
            />
          </>
        )}
      </TouchableOpacity>

      <AccessModal
        isShow={showAccessModal}
        title={`${localization.common.camera} / ${localization.common.gallery} / ${localization.common.files}`}
        onNegativePress={() => setToShowAccessModal(false)}
      />
    </>
  );
};

export default ImagePicker;
