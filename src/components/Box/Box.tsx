import React, {FC, memo, ReactNode} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

type BoxProps = {
  children: ReactNode;
};

const Box: FC<BoxProps> = ({children}) => (
  <View style={styles.box}>{children}</View>
);

export default memo(Box);
