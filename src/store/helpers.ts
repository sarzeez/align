import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore} from 'redux-persist';

export const ReduxPersistConfig = {
  active: true,
  reducerVersion: '1',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
  },
};

export const purgeLocalStore = (store: any, onComplete: any) => {
  const {reducerVersion} = ReduxPersistConfig;

  AsyncStorage.getItem('reducerVersion')
    .then(localVersion => {
      if (localVersion !== reducerVersion) {
        persistStore(store, null, onComplete).purge();
        AsyncStorage.setItem('reducerVersion', reducerVersion);
      } else {
        persistStore(store, null, onComplete);
      }
    })
    .catch(() => {
      persistStore(store, null, onComplete);
      AsyncStorage.setItem('reducerVersion', reducerVersion);
    });
};

export const enableHotReload = (store: any) => {
  if ((module as any).hot) {
    (module as any).hot.accept(() => {
      const nextRootReducer = require('./root.reducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }
};
