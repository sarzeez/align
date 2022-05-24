import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import ArrowDown from 'images/ArrowDown';

import styles from './styles';

type Props = {
  onPress: () => void;
};

const DropdownSelect = ({onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.label} numberOfLines={1}>
        Demo
      </Text>
      <View style={styles.arrow}>
        <ArrowDown />
      </View>
    </TouchableOpacity>
  );
};

export default DropdownSelect;
