import React from 'react';
import {Modal, View, TouchableWithoutFeedback} from 'react-native';
import {CustomButton} from 'components/CustomButton';
import {Colors} from 'theme';
import Spacer from 'components/Spacer/Spacer';
import Typography from 'components/Typography/Typography';
import styles from './styles';
import MarkIcon from './assets/mark';
import ErrorIcon from './assets/error';

type EventModalModalProps = {
  isShow: boolean;
  withTwoButtons?: boolean;
  title: string;
  underTitle?: string;
  firstButtonTitle?: string;
  secondButtonTitle?: string;
  icon?: Element;
  type?: 'success' | 'error';
  onFirstButtonPress: () => void;
  onSecondButtonPress?: () => void;
  onCloseModal: () => void;
  transparent?: boolean;
};

const EventModal = ({
  isShow,
  title,
  withTwoButtons,
  onCloseModal,
  underTitle = '',
  firstButtonTitle = 'Ok',
  secondButtonTitle = 'Ok',
  type = 'success',
  icon = type === 'success' ? <MarkIcon /> : <ErrorIcon />,
  onFirstButtonPress,
  onSecondButtonPress,
  transparent = false,
}: EventModalModalProps) => {
  return (
    <Modal visible={isShow} animationType="fade" transparent={transparent}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onCloseModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalInnerContainer}>
          <View style={styles.iconContainer}>{icon}</View>
          <Spacer height={16} />
          <View style={styles.modalContent}>
            <Typography type="h2" text={title} />
          </View>
          <Spacer height={12} />
          <Typography type="h4" text={underTitle} textCenter />
          <Spacer height={20} />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              height: 90,
            }}
          >
            {withTwoButtons && (
              <View style={[styles.withTwoButtons, {marginRight: 15}]}>
                <CustomButton
                  title={secondButtonTitle}
                  onPress={() => onSecondButtonPress?.()}
                  bgColorActive={Colors.gray7}
                />
              </View>
            )}
            <View
              style={withTwoButtons ? styles.withTwoButtons : styles.bigBtn}
            >
              <CustomButton
                title={firstButtonTitle}
                onPress={onFirstButtonPress}
                bgColorActive={Colors.orange}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EventModal;
