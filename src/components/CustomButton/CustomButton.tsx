import React, {memo, Component} from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {styles} from './CustomButtonStyles';
import {Colors} from 'theme';
import Typography from 'components/Typography/Typography';

export type CustomButtonProps = {
  title?: string;
  error?: boolean;
  spinner?: boolean;
  spinnerSize?: 'large' | 'small';
  bgColorActive?: string;
  bgColorUnactive?: string;
  bgColorError?: string;
  titleColor?: string;
  spinnerColor?: string;
  disabled?: boolean;
  borderWidth?: number;
  borderRadius?: number;
  activeOpacity?: number;
  borderColorActive?: string;
  borderColorUnactive?: string;
  titleType?: 'h1' | 'h2' | 'h3' | 'h4' | 'label' | 'body' | 'button';
  icon?: Component | Element;
  leftIcon?: Component | Element;
  buttonDescription?: Component | Element;
  onPress?: () => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  spinner,
  bgColorActive,
  bgColorUnactive,
  bgColorError,
  error,
  titleColor,
  spinnerColor,
  spinnerSize,
  disabled,
  borderWidth,
  borderRadius,
  borderColorActive,
  borderColorUnactive,
  titleType,
  icon,
  leftIcon,
  buttonDescription,
  onPress,
  activeOpacity = 0.2,
}) => {
  const {buttonStyle, textStyle, iconStyle} = React.useMemo(() => {
    return {
      buttonStyle: [
        styles.button,
        {
          backgroundColor: !error
            ? disabled
              ? bgColorUnactive
              : bgColorActive
            : bgColorError,
          borderColor: disabled ? borderColorUnactive : borderColorActive,
          borderWidth: borderWidth,
          borderRadius: borderRadius,
        },
      ],
      textStyle: [
        {
          color: disabled ? Colors.gray5 : titleColor,
        },
      ],
      iconStyle: [{}],
    };
  }, [
    error,
    disabled,
    bgColorUnactive,
    bgColorActive,
    bgColorError,
    borderColorUnactive,
    borderColorActive,
    borderWidth,
    borderRadius,
    titleColor,
  ]);

  return (
    <View style={styles.relativeContainer}>
      <TouchableOpacity
        style={buttonStyle}
        activeOpacity={activeOpacity}
        disabled={disabled || spinner}
        onPress={onPress}
      >
        {icon && <View style={iconStyle}>{icon}</View>}
        {spinner ? (
          <ActivityIndicator color={spinnerColor} size={spinnerSize} />
        ) : (
          title && (
            <View style={styles.row}>
              {leftIcon && <View style={styles.leftIconStyle}>{leftIcon}</View>}
              <Typography
                type={titleType ?? 'button'}
                text={title}
                style={textStyle}
              />
            </View>
          )
        )}
      </TouchableOpacity>
      {buttonDescription && (
        <View style={styles.buttonDescriptionContainer}>
          {buttonDescription}
        </View>
      )}
    </View>
  );
};

CustomButton.defaultProps = {
  spinner: false,
  titleColor: Colors.white,
  spinnerColor: Colors.white,
  disabled: false,
  borderWidth: 0,
  borderRadius: 20,
  bgColorError: Colors.red,
  error: false,
  spinnerSize: 'large',
};

const CustomButtonM = memo(CustomButton);
export {CustomButtonM as CustomButton};
