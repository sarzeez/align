import React from 'react';
import styled from 'styled-components/native';
import colors from 'theme/Colors';

import {StyleProp, TextStyle} from 'react-native';

import {textStyles} from './styles';

type TypographyProps = {
  type?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'body'
    | 'label'
    | 'error'
    | 'button'
    | 'chatName'
    | 'heading'
    | 'accountItem'
    | 'labelMedium'
    | 'bottomTabItem';
  fontType?: 'Regular' | 'Medium' | 'SemiBold' | 'Bold';
  isLink?: boolean;
  italic?: boolean;
  fontColor?: string;
  uppercase?: boolean;
  underlined?: boolean;
  textCenter?: boolean;
  capitalize?: boolean;
  text: string | number | undefined | null | string[];
  numberOfLines?: number;
  maxFontSizeMultiplier?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
  style?: StyleProp<TextStyle>;
};

const Typography = ({
  type = 'body',
  text,
  isLink,
  italic,
  fontColor,
  uppercase,
  underlined,
  textCenter,
  capitalize,
  numberOfLines,
  maxFontSizeMultiplier = 1,
  ellipsizeMode,
  fontType,
  style,
}: TypographyProps) => {
  return (
    <Text
      italic={italic}
      isLink={isLink}
      fontColor={fontColor}
      uppercase={uppercase}
      capitalize={capitalize}
      textCenter={textCenter}
      underlined={underlined}
      allowFontScaling={false}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[textStyles[type] as any, style]}
      fontType={fontType}
    >
      {text}
    </Text>
  );
};

const Text = styled.Text<{
  isLink?: boolean;
  italic?: boolean;
  textWidth?: number;
  fontColor?: string;
  fontType?: string;
  marginLeft?: number;
  lineHeight?: number;
  uppercase?: boolean;
  underlined?: boolean;
  capitalize?: boolean;
  textCenter?: boolean;
}>`
  color: ${props => (props.fontColor ? props.fontColor : colors.black)};
  ${props => props.italic && 'font-style: italic;'};
  ${props => props.textCenter && 'text-align: center;'};
  ${props => props.uppercase && 'text-transform: uppercase;'};
  ${props => props.capitalize && 'text-transform: capitalize;'};
  ${props => props.underlined && 'text-decoration: underline;'};
  ${props => props.fontType && `font-family: Inter-${props.fontType}`};
  ${props => props.lineHeight && `line-height: ${props.lineHeight};`};
  ${props => props.marginLeft && `margin-left: ${props.marginLeft}px;`};
  ${props =>
    props.isLink &&
    `
  text-decoration: underline;
  text-decoration-color: ${props.fontColor};
  `}
`;

export default Typography;
