// import {applyMiddleware, createStore} from 'redux';
import {Alert} from 'react-native';
import {persistStore} from 'redux-persist';
import {configureStore as configureStoreTool} from '@reduxjs/toolkit';
import {enableHotReload, purgeLocalStore} from 'store/helpers';
import {registerCommands} from './../commands/index';
import reactotron from 'store/ReactotronConfig';
import axiosMiddleware from 'store/middlewares/axios.middleware';
import loggerMiddleware from 'store/middlewares/logger.middleware';
import rootReducer from 'store/root.reducer';

const configureStore = (_: any, onComplete: any) => {
  const middlewares = [axiosMiddleware];
  const enhancers = [];

  if (__DEV__) {
    const createDebugger = require('redux-flipper').default;
    middlewares.push(createDebugger());
    middlewares.push(loggerMiddleware);
    // @ts-ignore
    enhancers.push(reactotron.createEnhancer());

    registerCommands();
  }

  const yeOldeConsoleLog = console.log;

  // make a new one
  console.log = (...args) => {
    // always call the old one, because React Native does magic swizzling too
    yeOldeConsoleLog(...args);
    // send this off to Reactotron.
    reactotron.display({
      name: 'CONSOLE.LOG',
      value: args,
      preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
    });
  };

  // const store = createStore(rootReducer, {}, applyMiddleware(...middlewares, ...enhancers));
  const store = configureStoreTool({
    reducer: rootReducer,
    middleware: middlewares,
    enhancers: enhancers,
  });

  const persistor = persistStore(store);

  // persistor.purge();
  purgeLocalStore(store, onComplete);
  enableHotReload(store);

  return {store, persistor};
};

export default configureStore;
