import React, {FC, useEffect, useRef} from 'react';
import {AppState, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {launchImageLibrary} from 'react-native-image-picker';

//import colors from 'theme/Colors';
//import {showRequestErrorMessage} from 'helpers/functions';
//mport localization from 'localization/localization';
import {useActionSheet} from 'helpers/provider';
import {styles} from './styles';
import {IS_IOS} from 'helpers/constants';
//import {PermissionsStatuses} from 'typings/types.common';
import {getStorageSelector} from 'store/reducers/accesses.reducer';
import {useSelector, useDispatch} from 'react-redux';
import AddFileIcon from '../../images/AddFileIcon';

export type File = {
  name: string | undefined;
  size: number | null | undefined;
  type: string | null | undefined;
  uri: string | undefined;
};

type FilePickerProps = {
  onSelectFile: (file: File) => void;
  onPressPicker: () => void;
  setToShowAccessModal: (val: boolean) => void;
};

enum Pickers {
  PhotoLibrary = 'photoLibrary',
  ChooseFile = 'chooseFile',
}

enum Sizes {
  MB10 = 10 * 1000000,
  MB50 = 50 * 1000000,
  MB1024 = 1024 * 1000000,
}

const EVENT_APP_STATE = 'change';

const validateFile = (file: File) => {
  if (!file.type || !file.size) {
    return;
  }

  if (
    ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.type)
  ) {
    if (file.size > Sizes.MB10) {
      return 'File must be .jpeg, .jpg, png, size <10M .';
    }
  } else if (file.type === 'application/pdf') {
    if (file.size > Sizes.MB10) {
      return 'File size must be <10M.';
    }
  } else if (
    [
      'application/doc',
      'application/docx',
      'application/ppt',
      'application/pptx',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ].includes(file.type)
  ) {
    if (file.size > Sizes.MB50) {
      return 'File size must be <50M.';
    }
  } else if (
    [
      'video/mp4',
      'video/avi',
      'video/3gp',
      'video/3gpp',
      'video/mov',
      'video/quicktime',
    ].includes(file.type)
  ) {
    if (file.size > Sizes.MB1024) {
      return 'File size must be <1024M.';
    }
  } else {
    return 'Unsupported format.';
  }
};

const FilePicker: FC<FilePickerProps> = ({
  onSelectFile,
  onPressPicker,
  setToShowAccessModal,
}) => {
  const {setActions} = useActionSheet();
  const shouldHandleBackground = useRef<boolean>(true);
  const storageAccess = useSelector(getStorageSelector);
  const dispatch = useDispatch();
  const MENU = [
    {
      key: Pickers.PhotoLibrary,
      text: 'first',
      onPress: () => {
        setActions([]);
        openPicker(Pickers.PhotoLibrary);
      },
    },
    {
      key: Pickers.ChooseFile,
      text: 'second',
      onPress: () => {
        setActions([]);
        openPicker(Pickers.ChooseFile);
      },
    },
  ];

  /*useEffect(() => {
    if (storageAccess) {
      checkPermission().then(permission => {
        dispatch(addStorageAccess(permission as any));
      });
    }
  }, [storageAccess, dispatch]);*/

  /*const checkPermission = async () => {
    const permissionsReq = await check(
      IS_IOS
        ? PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    );
    return permissionsReq;
  };

  useEffect(() => {
    AppState.addEventListener(EVENT_APP_STATE, onAppChangeCallback);

    return () => {
      AppState.removeEventListener(EVENT_APP_STATE, onAppChangeCallback);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAppChangeCallback = (state: string) => {
    if (IS_IOS) {
      shouldHandleBackground.current = true;
    }
    if (state === 'active' && shouldHandleBackground.current) {
      checkPermission().then(permission => {
        if (permission === PermissionsStatuses.granted) {
          dispatch(addStorageAccess(permission as any));
        }
      });
    }
  };*/

  const selectFile = async (key: string | number) => {
    try {
      if (key === Pickers.PhotoLibrary) {
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
      } else {
        const res = await DocumentPicker.pick({
          type: [
            DocumentPicker.types.images,
            DocumentPicker.types.video,
            DocumentPicker.types.pdf,
            DocumentPicker.types.doc,
            DocumentPicker.types.docx,
            DocumentPicker.types.ppt,
            DocumentPicker.types.pptx,
          ],
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
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        //showRequestErrorMessage(String(err));
      }
    }
  };

  const openPicker = (key: number | string) => {
    selectFile(key);
  };

  return (
    <TouchableOpacity
      style={styles.picker}
      onPress={() => {
        openPicker(Pickers.ChooseFile);
        setTimeout(() => {
          setActions(MENU);
        }, 200);
      }}
    >
      <AddFileIcon />
    </TouchableOpacity>
  );
};

export default FilePicker;
