import React, {ReactNode} from 'react';
import {ImageBackground, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import styles from './styles';

type WithBackgroundImageWrapper = {
  children: ReactNode;
};

const WithBackgroundImageWrapper: React.FC<WithBackgroundImageWrapper> = ({
  children,
}) => {
  return (
    <ImageBackground
      source={require('../../images/BlackBackground.png')}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView
        edges={['top']}
        style={{
          height: 62,
        }}
      />
      {children}
    </ImageBackground>
  );
};

export default WithBackgroundImageWrapper;
