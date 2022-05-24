import React from 'react';
import {TouchableOpacity} from 'react-native';

import styles from './styles';

import Typography from 'components/Typography/Typography';

const LinkButton = ({text, onPress}: {text: string; onPress: () => void}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Typography text={text} type="h4" />
  </TouchableOpacity>
);

export default LinkButton;
