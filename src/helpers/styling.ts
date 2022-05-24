import {PixelRatio, StyleProp} from 'react-native';

import {DEVICE_WIDTH, DEVICE_HEIGHT} from 'helpers/constants';
import colors from 'theme/Colors';
import {Colors} from '../theme';

const MOCKUP_WIDTH = 375;
const MOCKUP_HEIGHT = 812;

export const getContainer = (
  height: number,
  isCentered?: boolean,
  otherProps?: Object,
):
  | {
      height: number;
      width: string;
    }
  | {
      justifyContent: string;
      alignItems: string;
      height: number;
      width: string;
      constructor: Function;
      toString(): string;
      toLocaleString(): string;
      valueOf(): Object;
      isPrototypeOf(v: Object): boolean;
    }
  | any => {
  const container = {
    height: height,
    width: '100%',
    ...otherProps,
  };
  if (isCentered) {
    return {
      justifyContent: 'center',
      alignItems: 'center',
      ...container,
    };
  }
  return container;
};

export const getSquareContainer = (
  height: number,
  isCentered?: boolean,
  otherProps?: Object,
):
  | {
      height: number;
      width: string;
    }
  | {
      justifyContent: string;
      alignItems: string;
      height: number;
      width: string;
      constructor: Function;
      toString(): string;
      toLocaleString(): string;
      valueOf(): Object;
      isPrototypeOf(v: Object): boolean;
    }
  | any => {
  const container = {
    height: height,
    width: height,
    ...otherProps,
  };
  if (isCentered) {
    return {
      justifyContent: 'center',
      alignItems: 'center',
      ...container,
    };
  }
  return container;
};

export const getRound = (size: number, isCentered?: boolean): Object => {
  const container = {
    height: size,
    width: size,
    borderRadius: size / 2,
  };
  if (isCentered) {
    return {
      justifyContent: 'center',
      alignItems: 'center',
      ...container,
    };
  }
  return container;
};

export const getHitSlop = () => {
  return {
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
  };
};

export const getShadow = (
  color: string = Colors.blue,
  shadowRadius: number = 10,
  shadowOpacity: number = 0.1,
  elevation = 5,
): StyleProp<any> => {
  return {
    elevation,
    borderWidth: 0,
    shadowRadius,
    shadowOpacity,
    borderColor: colors.transparent,
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  };
};

export const getWidthWithScaleFactor = (size: number) => {
  // TODO: probably will use some of the options below
  // @Note: 360 x 640 - mockup sizes
  // @Note: 365 x 667 - iPhone 6 sizes (+ pixel ration equal 2)
  // console.log('Dimensions.get() ===== ', Dimensions.get('window'));
  // console.log('PixelRatio.get() ===== ', PixelRatio.get());
  // console.log('PixelRatio.getPixelSizeForLayoutSize(size) ===== ', PixelRatio.getPixelSizeForLayoutSize(size));
  return PixelRatio.roundToNearestPixel(size * (DEVICE_WIDTH / MOCKUP_WIDTH));
};
/**
 * Get size with scale factor
 * TODO: will use this for scale sizes for different phones and screen resolutions
 *
 * @param {number} size - original size
 */
export const getHeightWithScaleFactor = (size: number) => {
  // TODO: probably will use some of the options below
  // @Note: 360 x 640 - mockup sizes
  // @Note: 365 x 667 - iPhone 6 sizes (+ pixel ration equal 2)
  // console.log('Dimensions.get() ===== ', Dimensions.get('window'));
  // console.log('PixelRatio.get() ===== ', PixelRatio.get());
  // console.log('PixelRatio.getPixelSizeForLayoutSize(size) ===== ', PixelRatio.getPixelSizeForLayoutSize(size));
  return PixelRatio.roundToNearestPixel(size * (DEVICE_HEIGHT / MOCKUP_HEIGHT));
};

/**
 * Get font with scale factor
 * TODO: will use this for scale sizes for different phones and screen resolutions
 *
 * @param {number} size - original size
 */
export function getFontWithScaleFactor(size: number) {
  // return size;
  return PixelRatio.roundToNearestPixel(size * (DEVICE_HEIGHT / MOCKUP_HEIGHT));
}
