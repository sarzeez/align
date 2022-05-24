import {StyleSheet} from 'react-native';
import React from 'react';
import Typography from 'components/Typography/Typography';

const Label = ({text}: {text: string}) => {
  let labelColor;
  switch (text?.toLowerCase()) {
    case 'new':
      labelColor = '#09C875';
      break;
    case 'demo':
      labelColor = '#F16523';
      break;
    default:
      labelColor = 'black';
      break;
  }
  return (
    <Typography
      text={text}
      style={[styles.label, {backgroundColor: labelColor}]}
    />
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#ffffff',
    lineHeight: 12,
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default Label;
