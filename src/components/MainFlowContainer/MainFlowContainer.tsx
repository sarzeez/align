import React, {memo, ReactNode} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ViewStyle,
} from 'react-native';

import Typography from 'components/Typography/Typography';
import {styles} from './styles';
import Header from 'components/Header/Header';

export type MainFlowContainerProps = {
  titleIcon?: ReactNode;
  children: Element;
  titleLabel?: string;
  boxBackgroundColor?: string;
  heading?: string;
  title?: string;
  text?: string;
  withBackButton?: boolean;
  scrollEnabled?: boolean;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  headerComponent?: ReactNode;
  rightContainerStyle?: ViewStyle;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  titleButton?: ReactNode;
  backPress?: () => void;
};

const MainFlowContainer: React.FC<MainFlowContainerProps> = ({
  heading,
  scrollEnabled = true,
  keyboardShouldPersistTaps = 'always',
  titleIcon,
  children,
  title,
  titleLabel,
  text,
  withBackButton,
  leftComponent,
  rightComponent,
  headerComponent,
  rightContainerStyle,
  titleButton,
  boxBackgroundColor,
  backPress,
}) => {
  return (
    <View style={styles.globalContainer}>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={styles.safe}>
        <Header
          withBackButton={withBackButton}
          leftComponent={leftComponent}
          rightComponent={rightComponent}
          rightContainerStyle={rightContainerStyle}
          heading={heading}
          backPress={backPress}
        />
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          style={styles.main}
          scrollEnabled={scrollEnabled}
        >
          <View style={styles.heroContainer}>
            {titleIcon && (
              <View style={styles.imageContainer}>{titleIcon}</View>
            )}
            <View
              style={{
                ...((title || titleLabel || text) && styles.titleContainer),
              }}
            >
              {titleLabel && (
                <Typography
                  text={titleLabel}
                  type="label"
                  style={styles.titleLabel}
                />
              )}
              {title && (
                <Typography text={title} type="h2" style={styles.title} />
              )}
              {text && (
                <Typography text={text} type="body" style={styles.text} />
              )}
            </View>
            {titleButton && (
              <View style={styles.titleButton}>{titleButton}</View>
            )}
          </View>

          {headerComponent}
          <View
            style={[
              styles.box,
              !!boxBackgroundColor && {backgroundColor: boxBackgroundColor},
            ]}
          >
            {children}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

MainFlowContainer.defaultProps = {};

const MemorizedComponent = memo(MainFlowContainer);

export {MemorizedComponent as MainFlowContainer};
