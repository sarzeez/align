import React, {RefObject, useState} from 'react';
import {
  TextInput as InputRN,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';

import {Colors} from 'theme';
import {styles} from './styles';
import Typography from 'components/Typography/Typography';
import Spacer from 'components/Spacer/Spacer';
import VisibleIcon from './assets/visible';
import InvisibleIcon from './assets/invisible';

type InputProps = {
  label?: string | undefined;
  withEye?: boolean;
  isPassword?: boolean | undefined;
  isEmail?: boolean;
  error?: boolean;
  disabled?: boolean;
  width?: string;
  color?: string;
  height?: number;
  border?: boolean;
  bgColor?: string;
  padding?: number;
  fontSize?: number;
  widthAuto?: boolean;
  paddingTop?: number;
  multiline?: boolean;
  textIndent?: number;
  autoFocus?: boolean;
  borderColor?: string;
  placeholder?: string;
  borderRadius?: number;
  numberOfLines?: number;
  value?: string | undefined;
  leftComponent?: JSX.Element;
  rightComponent?: JSX.Element;
  rightComponentStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  errorContainerStyle?: ViewStyle;
  leftComponentStyle?: ViewStyle;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyBoardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search';
  textAlignVertical?: 'top' | 'auto' | 'bottom' | 'center';
  secureTextEntry?: boolean;
  editable?: boolean;
  placeholderTextColor?: string;
  maxFontSizeMultiplier?: number;
  refFer?: RefObject<InputRN>;
  fontType?: 'bold' | 'normal';
  blurOnSubmit?: boolean;
  onFocus?: (value: any) => void;
  onChange: (value: any) => void;
  onBlur?: (value: any) => void;
  alignTextCenter?: boolean;
  isTouched?: boolean;
  withShadow?: boolean;

  fakeInput?: boolean;
};

const TextInput = ({
  label,
  disabled = false,
  withShadow = false,
  withEye = false,
  isPassword = false,
  error,
  width,
  value,
  color,
  border,
  refFer,
  height = 55,
  bgColor,
  padding,
  multiline,
  paddingTop,
  borderColor,
  fontType = 'normal',
  keyBoardType = 'default',
  textAlignVertical,
  fontSize = 18,
  autoFocus = false,
  placeholder,
  widthAuto,
  secureTextEntry,
  autoCapitalize,
  textIndent = 17,
  numberOfLines = 1,
  borderRadius = 20,
  placeholderTextColor = Colors.placeholderColor,
  maxFontSizeMultiplier = 1,
  onBlur,
  onFocus,
  onChange,
  editable,
  blurOnSubmit,
  alignTextCenter,
  leftComponent,
  rightComponent,
  rightComponentStyle,
  leftComponentStyle,
  inputStyle,
  containerStyle,
  fakeInput = false,
}: InputProps) => {
  const [isFocused, setFocuse] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState(true);

  const handleOnFocus = (value: any) => {
    setFocuse(true);
    onFocus && onFocus(value);
  };

  const handleOnBlur = (value: any) => {
    setFocuse(false);
    onBlur && onBlur(value);
  };

  return (
    <>
      {!!label && (
        <View style={{alignSelf: 'flex-start'}}>
          <Typography text={label} fontColor={Colors.bodyBase} type="label" />
          <Spacer height={8} />
        </View>
      )}
      <Container
        disabled={disabled}
        isFocused={isFocused}
        value={value}
        error={error}
        width={width}
        height={height}
        border={border}
        bgColor={bgColor}
        widthAuto={widthAuto}
        paddingTop={paddingTop}
        multiline={multiline}
        textIndent={textIndent}
        borderColor={borderColor}
        borderRadius={borderRadius}
        numberOfLines={numberOfLines}
        isPassword={isPassword}
        style={[withShadow && styles.withShadow, containerStyle]}
      >
        {fakeInput ? (
          <TouchableOpacity onPress={onFocus} style={styles.fakeInputStyle}>
            <Typography
              fontColor={value ? Colors.textBlack : Colors.placeholderColor}
              text={value || placeholder}
            />
          </TouchableOpacity>
        ) : (
          <InputText
            withEye={withEye}
            error={error}
            value={value}
            color={color}
            height={height}
            padding={padding}
            fontType={fontType}
            ref={refFer as any}
            fontSize={fontSize}
            autoFocus={autoFocus}
            multiline={multiline}
            widthAuto={widthAuto}
            keyboardType={keyBoardType}
            autoCapitalize={autoCapitalize}
            allowFontScaling={false}
            placeholder={placeholder}
            numberOfLines={numberOfLines}
            secureTextEntry={
              isPassword ? secureTextEntry && hidePassword : secureTextEntry
            }
            textAlignVertical={textAlignVertical}
            underlineColorAndroid={Colors.transparent}
            placeholderTextColor={placeholderTextColor}
            maxFontSizeMultiplier={maxFontSizeMultiplier}
            onBlur={handleOnBlur}
            blurOnSubmit={blurOnSubmit}
            onFocus={handleOnFocus}
            onChangeText={onChange}
            editable={editable}
            alignTextCenter={alignTextCenter}
            style={inputStyle}
          />
        )}
        {!!value && (
          <View
            style={[
              styles.errorIconContainer,
              withEye && styles.errorContainerStyle,
            ]}
          />
        )}
        {!!leftComponent && (
          <View style={[styles.leftComponent, leftComponentStyle]}>
            {leftComponent}
          </View>
        )}
        {!!rightComponent && (
          <View style={[styles.rightComponent, rightComponentStyle]}>
            {rightComponent}
          </View>
        )}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            style={[
              styles.rightComponent,
              styles.hideShowButtonStyle,
              rightComponentStyle,
            ]}
          >
            {hidePassword ? <InvisibleIcon /> : <VisibleIcon />}
          </TouchableOpacity>
        )}
      </Container>
    </>
  );
};

const Container = styled.View<{
  error?: boolean;
  width?: string;
  height?: number;
  bgColor?: string;
  border?: boolean;
  textIndent: number;
  widthAuto?: boolean;
  paddingTop?: number;
  multiline?: boolean;
  isPassword?: boolean;
  borderColor?: string;
  borderRadius?: number;
  numberOfLines: number;
  isFocused?: boolean;
  disabled?: boolean;
  value?: string | undefined;
}>`
  flex-direction: row;
  border-radius: ${props => props.borderRadius}px;
  padding-horizontal: ${props => props.textIndent}px;
  width: ${props =>
    props.widthAuto ? 'auto' : props.width ? props.width : '100%'};
  height: ${props => (props.height ? `${props.height}px` : '55px')};
  align-items: ${props => (props.multiline ? 'flex-start' : 'center')};
  background-color: ${props =>
    props.disabled
      ? Colors.disabledInputBackgroundColor
      : props.bgColor
      ? props.bgColor
      : Colors.transparent};
  border: ${props =>
    `1px solid  ${
      props.error
        ? Colors.red
        : props.borderColor
        ? props.borderColor
        : props.value || props.isFocused
        ? Colors.dividerColor
        : Colors.dividerColor
    }`};
  ${props => props.paddingTop && `padding-top: ${props.paddingTop}px;`};
`;

const InputText = styled.TextInput<{
  color?: string;
  padding?: number;
  fontSize?: number;
  fontType: 'bold' | 'normal';
  height?: number;
  blurOnSubmit?: boolean;
  alignTextCenter?: boolean;
  widthAuto?: boolean;
  error?: boolean;
  withEye?: boolean;
}>`
  font-size: ${props => props.fontSize}px;
  color: ${props =>
    props.error && props.secureTextEntry
      ? Colors.red
      : props.color
      ? props.color
      : Colors.darkBlue};
  height: ${props => (props.height ? `${props.height}px` : '44px')};
  ${props => props.padding && `padding: ${props.padding}px;`};
  ${props => props.alignTextCenter && 'text-align: center;'};
  ${props => !props.widthAuto && 'flex: 1;'};
  font-weight: ${props => props.fontType};
  ${props => !props.secureTextEntry && 'font-family: Inter-Regular'};
`;

export default TextInput;
