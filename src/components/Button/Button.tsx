import React, {ReactNode} from 'react';
import {
  TouchableOpacity,
  StyleProp,
  ActivityIndicator,
  View,
} from 'react-native';
import Typography from 'components/Typography/Typography';
import {Colors} from 'theme';
import {styles} from './styles';

type ButtonProps = {
  transparent?: boolean;
  small?: boolean;
  btnText: string;
  leftIconAlignToText?: ReactNode;
  labelSize?: number;
  disabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  withShadow?: boolean;
  withLoader?: boolean;
  loaderColor?: string;
  loaderSize?: 'large' | 'small';
  labelFontColor?: string;
  style?: StyleProp<any>;
  defaultBtnText?: StyleProp<any>;
  onPress?: () => void;
  leftIcon?: JSX.Element;
  labelType?: 'h1' | 'h2' | 'h3' | 'label' | 'body';
  borderRadius?: number;
  backgroundColor?: string;
  smallButtonBgColor?: string;
};

const Button = ({
  onPress,
  btnText,
  withLoader,
  style,
  isLoading = false,
  transparent = false,
  disabled = false,
  small = false,
  fullWidth,
  labelFontColor = Colors.white,
  loaderColor = Colors.lightBlue,
  loaderSize = 'large',
  labelType = 'label',
  leftIcon,
  leftIconAlignToText,
  borderRadius = 999,
  backgroundColor = Colors.orange,
  smallButtonBgColor = Colors.smallButtonBgColor
}: ButtonProps) => (
  <View style={fullWidth && styles.withFullWidth}>
    <TouchableOpacity
      disabled={disabled || isLoading}
      style={[
        styles.buttonStyle,
        fullWidth && styles.withFullWidth,
        disabled && styles.disabledStyles,
        transparent && styles.transparentStyle,
        small && styles.smallStyle,
        style,
        { borderRadius, backgroundColor: small? smallButtonBgColor: backgroundColor }
      ]}
      onPress={onPress}
    >
      {withLoader && isLoading ? (
        <ActivityIndicator size={loaderSize} color={loaderColor} />
      ) : (
        <>
          {!!leftIcon && (
            <View
              style={[
                leftIconAlignToText
                  ? styles.leftIconAlignToTextStyle
                  : styles.leftIconStyle,
              ]}
            >
              {leftIcon}
            </View>
          )}
          <Typography
            type={small ? 'button' : labelType || 'h3'}
            text={btnText}
            fontColor={
              small || transparent
                ? Colors.blue
                : labelFontColor
                ? labelFontColor
                : Colors.white
            }
          />
        </>
      )}
    </TouchableOpacity>
  </View>
);

export default Button;
