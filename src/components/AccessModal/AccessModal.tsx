import React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {openSettings} from 'react-native-permissions';

import Spacer from 'components/Spacer/Spacer';
import Typography from 'components/Typography/Typography';
import {styles} from './styles';
import localization from 'localization/localization';
import LockAccessIcon from 'images/LockAccessIcon';

type DialogWindowModalProps = {
  isShow: boolean;
  title: string;
  allowButtonName?: string;
  dontAllowButtonName?: string;
  onNegativePress: () => void;
};

const AccessModal = ({
  isShow,
  title,
  allowButtonName = 'Permit',
  dontAllowButtonName = 'Later',
  onNegativePress,
}: DialogWindowModalProps) => {
  const onOpenSettings = async () => {
    await openSettings();
    onNegativePress && onNegativePress();
  };
  return (
    <Modal visible={isShow} transparent animationType="fade">
      <View style={styles.container}>
        <TouchableWithoutFeedback>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalInnerContainer}>
          <Spacer height={12} />
          <LockAccessIcon />
          <Spacer height={24} />
          <View style={styles.modalContent}>
            <Typography
              textCenter
              style={styles.headingStyle}
              text={localization.common.needPermissions}
            />
          </View>

          <Spacer height={12} />
          <Typography
            text={localization.common.toAccess}
            textCenter
            style={styles.descriptionStyle}
          />
          <Spacer height={2} />
          <Typography text={title} textCenter style={styles.descriptionStyle} />
          <Spacer height={19} />
          <View style={styles.buttonsWrapper}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={onOpenSettings}
            >
              <Typography
                text={allowButtonName}
                style={styles.allowButton}
                type="button"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={onNegativePress}
            >
              <Typography
                style={styles.dontAllowButton}
                text={dontAllowButtonName}
                type="button"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AccessModal;
