import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, TouchableOpacity, StyleProp} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';

//import BackButtonIcon from 'components/Icons/BackButtonIcon';
import {DEVICE_HEIGHT, DEVICE_WIDTH, SCREEN_HEIGHT} from 'helpers/constants';
import {getHitSlop} from 'helpers/styling';
import colors from 'theme/Colors';

type SectionProps = {
  width?: number | string;
  height?: number | string;
  bgColor?: string;
  offsetTop?: number;
  clientTop?: number;
  offsetLeft?: number;
  fullWidth?: boolean;
  clientLeft?: number;
  safeAreaBg?: string;
  arrowIcon?: boolean;
  clientRight?: number;
  isScrolled?: boolean;
  fullHeight?: boolean;
  offsetRight?: number;
  borderRadius?: number;
  clientBottom?: number;
  offsetBottom?: number;
  withSafeArea?: boolean;
  scrollEnabled?: boolean;
  children: React.ReactNode;
  offsetHorizontal?: number;
  centerContentVertically?: boolean;
  enableResetScrollToCoords?: boolean;
  centerContentHorizontally?: boolean;
  activeHeaderStyles?: StyleProp<any>;
  onStickyHeaderActivation?: () => void;
  onStickyHeaderDeactivation?: () => void;
  StickyHeaderComponent?: React.ReactNode;
  showsVerticalScrollIndicator?: boolean;
  keyboardShouldPersistTaps?:
    | boolean
    | 'always'
    | 'never'
    | 'handled'
    | undefined;
};

const Section = ({
  width,
  height,
  children,
  fullWidth,
  arrowIcon,
  isScrolled,
  fullHeight,
  borderRadius,
  withSafeArea,
  offsetTop = 0,
  clientTop = 0,
  clientLeft = 0,
  offsetLeft = 0,
  offsetRight = 0,
  clientRight = 0,
  offsetBottom = 0,
  clientBottom = 0,
  offsetHorizontal,
  activeHeaderStyles,
  scrollEnabled = true,
  StickyHeaderComponent,
  bgColor = colors.white,
  centerContentVertically,
  centerContentHorizontally,
  safeAreaBg = colors.white,
  enableResetScrollToCoords = true,
  keyboardShouldPersistTaps = 'never',
  showsVerticalScrollIndicator = false,
  onStickyHeaderActivation,
  onStickyHeaderDeactivation,
}: SectionProps) => {
  const navigation = useNavigation();
  const [isActiveHeaderStyles, setIsActiveHeaderStyles] =
    useState<boolean>(false);

  return (
    //TODO: remove style flex:1
    <View>
      {isScrolled ? (
        <KeyboardAwareScrollView
          bounces={false}
          enableOnAndroid
          nestedScrollEnabled={true}
          removeClippedSubviews={false}
          scrollEnabled={scrollEnabled}
          onScroll={event => {
            if (StickyHeaderComponent) {
              const y = event.nativeEvent.contentOffset.y;
              const isActive = y > 10;
              setIsActiveHeaderStyles(isActive);
              if (isActive) {
                onStickyHeaderActivation && onStickyHeaderActivation();
              } else {
                onStickyHeaderDeactivation && onStickyHeaderDeactivation();
              }
            }
          }}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          enableResetScrollToCoords={enableResetScrollToCoords}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          stickyHeaderIndices={StickyHeaderComponent ? [0] : undefined}
        >
          {StickyHeaderComponent && (
            <View style={isActiveHeaderStyles ? activeHeaderStyles : undefined}>
              {StickyHeaderComponent}
            </View>
          )}

          <View
            style={[
              {
                width: fullWidth ? DEVICE_WIDTH : width,
                height: fullHeight ? DEVICE_HEIGHT : height,
                marginTop: offsetTop,
                paddingTop: clientTop,
                marginLeft: offsetLeft,
                marginRight: offsetRight,
                marginBottom: offsetBottom,
                paddingBottom: clientBottom,
                borderRadius: borderRadius,
                paddingLeft: offsetHorizontal ? offsetHorizontal : clientLeft,
                paddingRight: offsetHorizontal ? offsetHorizontal : clientRight,
                backgroundColor: bgColor,
                alignItems: centerContentVertically ? 'center' : 'flex-start',
                justifyContent: centerContentHorizontally
                  ? 'center'
                  : 'flex-start',
              },
            ]}
          >
            {withSafeArea && (
              <SafeAreaView
                edges={['top']}
                style={{
                  backgroundColor: safeAreaBg,
                }}
              />
            )}
            {arrowIcon && (
              <TouchableOpacity
                hitSlop={getHitSlop()}
                onPress={() => navigation.goBack()}
              /> //TODO add the BacIcon here
            )}
            {children}
          </View>
        </KeyboardAwareScrollView>
      ) : (
        <>
          {StickyHeaderComponent ? StickyHeaderComponent : null}
          <View
            style={{
              width: fullWidth ? DEVICE_WIDTH : width,
              height: fullHeight ? SCREEN_HEIGHT : height,
              marginTop: offsetTop,
              paddingTop: clientTop,
              marginLeft: offsetLeft,
              marginRight: offsetRight,
              borderRadius: borderRadius,
              marginBottom: offsetBottom,
              paddingBottom: clientBottom,
              paddingLeft: offsetHorizontal ? offsetHorizontal : clientLeft,
              paddingRight: offsetHorizontal ? offsetHorizontal : clientRight,
              backgroundColor: bgColor,
              alignItems: centerContentHorizontally ? 'center' : 'flex-start',
              justifyContent: centerContentVertically ? 'center' : 'flex-start',
            }}
          >
            {withSafeArea && !StickyHeaderComponent && (
              <SafeAreaView
                edges={['top']}
                style={{
                  backgroundColor: safeAreaBg,
                }}
              />
            )}

            {children}
          </View>
        </>
      )}
    </View>
  );
};

export default Section;
