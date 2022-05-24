import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from './styles';
import CheckBox from 'components/CheckBox/CheckBox';
import Typography from 'components/Typography/Typography';
import shadows from 'theme/Shadows';

type CheckBoxButtonTypes = {
  onPress: () => void;
  title: string;
  checkedValue: string;
};

const CheckBoxButton = ({
  onPress,
  title,
  checkedValue,
}: CheckBoxButtonTypes) => {
  const isChecked = title === checkedValue;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {...shadows.sh2}]}>
      <CheckBox checked={isChecked} onPress={onPress}/>
      <Typography text={title} fontType="Medium" style={styles.textStyle} />
    </TouchableOpacity>
  );
};

export default CheckBoxButton;
