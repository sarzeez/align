import React, {ReactNode} from 'react';
import {View, TouchableOpacity, ViewStyle, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'theme';
import Typography from 'components/Typography/Typography';
import Spacer from 'components/Spacer/Spacer';
import {styles} from './styles';
import {IS_IPHONE_X} from 'helpers/constants';
import CaretLeft from 'images/CaretLeft';
import {getHitSlop} from 'helpers/styling';

type headerTypes = {
  heading?: string | ReactNode;
  isHeadingLeft?: boolean;
  witNewBackIcon?: boolean;
  isAuthentic?: boolean;
  withSpacer?: boolean;
  withBorderRadius?: boolean;
  withBackButton?: boolean;
  chatScreen?: boolean;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  bgColor?: string;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  leftContainerStyle?: ViewStyle;
  rightContainerStyle?: ViewStyle;
  backPress?: () => void;
};

const Header = ({
  heading,
  withBackButton = false,
  withSpacer = true,
  isAuthentic = false,
  chatScreen = false,
  bgColor = Colors.white,
  leftComponent,
  rightComponent,
  isHeadingLeft,
  containerStyle,
  withBorderRadius = false,
  style,
  leftContainerStyle,
  rightContainerStyle,
  backPress,
}: headerTypes) => {
  const navigation = useNavigation();
  return (
    <>
      {withSpacer && <Spacer height={IS_IPHONE_X ? 0 : 10} />}
      <View
        style={[
          styles.container,
          isHeadingLeft && styles.leftHeading,
          isAuthentic && styles.authStyle,
          {backgroundColor: bgColor},
          containerStyle,
          withBorderRadius && styles.withBorderRadius,
          style,
        ]}
      >
        <View style={styles.head}>
          {withBackButton ? (
            <TouchableOpacity
              hitSlop={getHitSlop()}
              onPress={() => (!!backPress ? backPress() : navigation.goBack())}
              style={[styles.headBtn, styles.shadowBtn]}
            >
              <CaretLeft />
            </TouchableOpacity>
          ) : !withBackButton && leftComponent ? (
            <View style={styles.headBtn}>{leftComponent}</View>
          ) : (
            <View style={styles.headBtn} />
          )}
          {typeof heading === 'string' ? (
            <Typography text={heading} type="heading" textCenter />
          ) : chatScreen ? (
            heading
          ) : (
            <Image source={require('./assets/header.png')} style={styles.img} />
          )}
          {!!leftComponent && withBackButton ? (
            <View style={[styles.headBtn, leftContainerStyle]}>
              {leftComponent}
            </View>
          ) : (
            <View style={styles.headItem} />
          )}
        </View>
        {!!rightComponent && (
          <View style={[styles.rightContainer, rightContainerStyle]}>
            {rightComponent}
          </View>
        )}
      </View>
    </>
  );
};

export default Header;
