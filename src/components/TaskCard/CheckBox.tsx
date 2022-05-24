import React, {memo} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {Colors} from 'theme';
import CheckMark from './assets/checkMark';

type CheckBoxTypes = {
  checked?: boolean;
  onPress: () => void;
};

const CheckBox = ({checked, onPress}: CheckBoxTypes) => (
  <Pressable
    hitSlop={20}
    onPress={onPress}
    style={({pressed}) => [
      {
        opacity: pressed ? 0.5 : 1,
      },
      styles.container,
      checked ? styles.checked : styles.unchecked,
    ]}
  >
    <CheckMark />
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    height: 26,
    width: 26,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  unchecked: {
    borderColor: Colors.gray4,
  },
  checked: {
    borderColor: Colors.orange,
    backgroundColor: Colors.orange,
  },
});

export default memo(CheckBox);
