import React, {memo} from 'react';
import {View, SafeAreaView} from 'react-native';
import {styles} from './LoginFlowContainerStyles';
import OnBoardingImage from 'images/OnBoardingImage';

export type LoginFlowContainerProps = {
  children: Element;
};

const LoginFlowContainer: React.FC<LoginFlowContainerProps> = ({children}) => {
  return (
    <View style={styles.globalContainer}>
      <View
        style={{position: 'absolute', zIndex: -1, top: 0, bottom: 0, left: 0, right: 0}}
      >
        <OnBoardingImage />
      </View>
      <SafeAreaView style={styles.safe}>
        <View style={styles.screenContainer}>{children}</View>
      </SafeAreaView>
    </View>
  );
};

LoginFlowContainer.defaultProps = {};

const MemorizedComponent = memo(LoginFlowContainer);
export {MemorizedComponent as LoginFlowContainer};
