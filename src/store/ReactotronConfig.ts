import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reactotron = Reactotron.setAsyncStorageHandler!(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    // controls connection & communication settings
    // host: '192.168.0.104',
    name: 'align',
  })
  .useReactNative({
    asyncStorage: false, // there are more options to the async storage.
    editor: true, // there are more options to editor
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
    errors: {
      // forward all errors to Reactotron
      // ignore all error frames from react-native (for example)
      veto: (frame: {fileName: string}) =>
        frame.fileName.indexOf('/node_modules/react-native/') >= 0,
    }, // or turn it off with false
  })
  .use(reactotronRedux())
  .connect();

export default reactotron;
