import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';

import {Colors} from 'theme';

const MainLoader = () => (
  <Modal transparent visible>
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        opacity: 0.2,
      }}
    >
      <ActivityIndicator size="large" color={Colors.white} />
    </View>
  </Modal>
);

export default MainLoader;
