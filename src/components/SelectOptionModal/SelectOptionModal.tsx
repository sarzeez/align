import React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {CustomButton} from 'components/CustomButton';
import {Colors} from 'theme';
import Spacer from 'components/Spacer/Spacer';
import Typography from 'components/Typography/Typography';
import Input from 'components/Input/Input';

import CaretLeft from 'images/CaretLeft';
import {getHitSlop} from 'helpers/styling';

import styles from './style';

type SelectOptionModalProps = {
  isShow: boolean;
  title: string;
  label: string;
  firstState: string;
  firstOnchange: (e: any) => void;
  firstButtonTitle?: string;
  onFirstButtonPress: () => void;
  onCloseModal: () => void;
  transparent?: boolean;
};

const SelectOptionModal = ({
  isShow,
  title,
  label,
  firstState,
  firstOnchange,
  onCloseModal,
  firstButtonTitle = 'Add',
  onFirstButtonPress,
  transparent = false,
}: SelectOptionModalProps) => {
  const navigation = useNavigation();
  return (
    <Modal visible={isShow} animationType="fade" transparent={transparent}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onCloseModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalInnerContainer}>
          <Spacer height={16} />
          <View style={styles.backBtn}>
            <TouchableOpacity
              hitSlop={getHitSlop()}
              onPress={onCloseModal}
              style={[styles.headBtn, styles.shadowBtn]}
            >
              <CaretLeft />
            </TouchableOpacity>
          </View>
          <Typography type="h2" text={title} />
          <Spacer height={12} />
          <Input
            label={label}
            placeholder={label}
            onChange={firstOnchange}
            value={firstState}
          />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              height: 90,
            }}
          >
            <View style={styles.bigBtn}>
              <CustomButton
                title={firstButtonTitle}
                onPress={onFirstButtonPress}
                bgColorActive={Colors.orange}
                bgColorUnactive={Colors.gray4}
                disabled={firstState ? false : true}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SelectOptionModal;
