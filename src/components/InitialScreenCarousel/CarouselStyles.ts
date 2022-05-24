import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from 'helpers/constants';
import { Colors } from 'theme';

export const styles = StyleSheet.create({
  topImageContainer: {
    width: '100%',
    height: DEVICE_HEIGHT * 0.25,
    alignItems: 'center',
    position: 'relative',
    zIndex: 2
  },
  topImg: {
    borderRadius: 32,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  bottomImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  bottomImageContainer1: {
    width: DEVICE_WIDTH * 0.38,
    aspectRatio: 1,
    position: 'absolute',
    bottom: -DEVICE_WIDTH * 0.22
  },
  bottomImageContainer2: {
    width: DEVICE_WIDTH * 0.65,
    aspectRatio: 3 / 2,
    position: 'absolute',
    bottom: -DEVICE_WIDTH * 0.22
  },
  bottomImageContainer3: {
    width: DEVICE_WIDTH * 0.6,
    aspectRatio: 3 / 2,
    position: 'absolute',
    bottom: -DEVICE_WIDTH * 0.22
  },
  centered: {
    width: '100%',
    alignItems: 'center'
  },
  decorLine: {
    marginVertical: 16,
    height: 1,
    width: '35%',
    backgroundColor: Colors.gray2,
    borderRadius: 1
  }
});