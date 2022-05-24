import React, {FC, memo, ReactNode} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Spacer from 'components/Spacer/Spacer';
import Typography from 'components/Typography/Typography';
import {styles} from './styles';

type CardProps = {
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  title?: string;
  text?: string;
  onPress: () => void;
  borderRadius?: number;
};

const Card: FC<CardProps> = ({
  leftComponent,
  rightComponent,
  title,
  text,
  onPress,
  borderRadius = 16,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, {borderRadius}]}>
        {leftComponent}
        <Spacer width={12} />
        {title && <Typography type="h4" text={title} style={styles.title} />}
        <Typography type="body" text={text} style={styles.text} />
        {rightComponent}
      </View>
    </TouchableOpacity>
  );
};

export default memo(Card);
