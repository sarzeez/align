import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

type dividerTypes = {
  color?: string;
};

const Divider = ({color}: dividerTypes) => {
  return (
    <View style={[styles.container, !!color && {backgroundColor: color}]} />
  );
};

export default Divider;
