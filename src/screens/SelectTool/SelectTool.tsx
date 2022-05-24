import {Modal, StatusBar, TouchableOpacity, View, Text} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MenuIcon from 'images/MenuIcon';
import Typography from 'components/Typography/Typography';
import CloseIcon from 'images/CloseIcon';
import localization from 'localization/localization';
import {styles as headerStyles} from 'components/Header/styles';
import Button from 'components/Button/Button';
import Spacer from 'components/Spacer/Spacer';

import {styles} from './style';
import shadows from 'theme/Shadows';

const SelectTool = ({
  modalVisible,
  setModalVisible,
  handleAddNewTool,
  onPress,
  list,
}: any) => {
  return (
    <>
      <StatusBar barStyle={modalVisible ? 'light-content' : 'dark-content'} />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <Typography
              type="h2"
              text={localization.project.modal.actions.title}
            />
            <TouchableOpacity
              style={[headerStyles.headBtn, headerStyles.shadowBtn]}
              onPress={() => setModalVisible(false)}
            >
              <CloseIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            {list?.map((item: any, index: number) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  onPress={() => onPress(item)}
                  style={[styles.btnDefault, shadows.sh1]}
                >
                  <Typography type={'h4'} text={item.label} />
                </TouchableOpacity>
                <Spacer height={10} />
              </React.Fragment>
            ))}
            <Button
              btnText="Add New Tool"
              style={[styles.btn, shadows.sh1]}
              onPress={handleAddNewTool}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default SelectTool;
