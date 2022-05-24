/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import 'react-native-gesture-handler';

import configureStore from './src/store/storeConfiguration';
import RootContainer from './src/screens/RootContainer/RootContainer';
import OneSignalManager from './src/services/oneSignal/oneSignalManager';
import {ActionSheetProvider} from 'components/ActionSheet/ActionSheetProvider';
import ActionSheet from 'components/ActionSheet/ActionSheet';

global.__reanimatedWorkletInit = () => {};

const {store, persistor} = configureStore({}, null);

const App = () => {
  const [actions, setActions] = useState([]);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <ActionSheetProvider
            actions={actions}
            setActions={setActions}
            title={title}
            setTitle={setTitle}
          >
            <PersistGate loading={null} persistor={persistor}>
              <ActionSheet />
              <RootContainer />
              <OneSignalManager />
            </PersistGate>
          </ActionSheetProvider>
          <FlashMessage />
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </Provider>
  );
};

export {App, store};
