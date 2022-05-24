import React, {FC, memo, useState} from 'react';
import {Modal, SafeAreaView, TouchableOpacity, View} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment, {Moment} from 'moment';
import Typography from 'components/Typography/Typography';
import {styles as headerStyles} from 'components/Header/styles';
import localization from 'localization/localization';
import CloseIcon from 'images/CloseIcon';
import {styles} from './styles';
import {CustomButton} from 'components/CustomButton';
import {Colors} from 'theme';

type CalendarModalPrpos = {
  isVisible: boolean;
  onClose: () => void;
  onSetDate: (date?: string) => void;
  dateFormat?: string;
};

const CalendarModal: FC<CalendarModalPrpos> = ({
  isVisible = false,
  onClose,
  onSetDate,
  dateFormat = 'DD/MM/YYYY',
}) => {
  const [date, setDate] = useState<Moment | null>(null);

  const handleSetDate = () => {
    onSetDate(date?.format(dateFormat));
    onClose();
  };
  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modal}>
        <View style={styles.modalHeader}>
          <Typography
            type="h2"
            text={localization.addPunchList.dateModal.title}
          />
          <TouchableOpacity
            style={[headerStyles.headBtn, headerStyles.shadowBtn]}
            onPress={onClose}
          >
            <CloseIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.modalContent}>
          <CalendarPicker onDateChange={setDate} />
          <View style={styles.buttonContainer}>
            <CustomButton
              title={localization.room.saveRoom}
              onPress={handleSetDate}
              bgColorActive={Colors.orange}
              bgColorUnactive={Colors.gray4}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default memo(CalendarModal);
