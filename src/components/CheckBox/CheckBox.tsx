import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from './CheckBoxStyles';
import { Colors } from 'theme';
import MarkIcon from './assets/mark';

type CheckBoxTypes = {
  checked: boolean;
  onPress: () => void;
};

const CheckBox = ({checked, onPress}: CheckBoxTypes) => (
  <TouchableOpacity 
    style={[styles.container, checked? styles.checked: styles.unchecked]}
    onPress={() => onPress()}
  >
    <MarkIcon color={Colors.white}/>
  </TouchableOpacity>
);

export default memo(CheckBox);