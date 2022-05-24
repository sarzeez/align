import Typography from 'components/Typography/Typography';
import React, {FC, ReactNode} from 'react';
import {View} from 'react-native';
import styles from './styles';

type Props = {
  title?: string;
  text: string;
  content?: ReactNode;
  height?: number | string;
  backgroundColor?: string;
  titleSize?: number;
  titleColor?: string;
  textSize?: number;
  textColor?: string;
};

const Placeholder: FC<Props> = ({
  title,
  titleSize,
  titleColor,
  text,
  textSize,
  textColor,
  content,
  height,
  backgroundColor,
}) => {
  return (
    <View style={[styles.container, {height, backgroundColor}]}>
      {content}
      {title && (
        <Typography
          type="h3"
          style={[
            styles.placeholderTitle,
            {
              ...(titleSize && {
                fontSize: titleSize,
                lineHeight: titleSize,
              }),
              ...(titleColor && {
                color: titleColor,
              }),
            },
          ]}
          text={title}
        />
      )}
      <Typography
        style={[
          styles.placeholderText,
          {
            ...(textSize && {fontSize: textSize}),
            ...(textColor && {
              color: textColor,
            }),
          },
        ]}
        text={text}
      />
    </View>
  );
};

export default Placeholder;
