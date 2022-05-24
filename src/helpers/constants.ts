import {Dimensions, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {isIphoneX} from 'react-native-iphone-x-helper';
// import DeviceInfo from 'react-native-device-info';

export const {height: DEVICE_HEIGHT, width: DEVICE_WIDTH} =
  Dimensions.get('window');
export const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} =
  Dimensions.get('screen');

const isSimulator = async () => {
  return true;
};

export const PAGINATION_LIMIT = 25;
export const BOTTOM_BAR_HEIGHT = 85;
export const STICKY_HEADER_HEIGHT = 40;
export const STATUS_BAR_INIT_VALUE = 25;
export const IS_IOS = Platform.OS === 'ios';
export const STATUS_BAR_HEIGHT = getStatusBarHeight();
export const PADDING_HORIZONTAL = 32;
export const IS_IPHONE_X = isIphoneX();
export const IS_SIMULATOR = isSimulator();
