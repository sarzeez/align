import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {DEVICE_WIDTH, PADDING_HORIZONTAL} from 'helpers/constants';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    height: 72,
    paddingVertical: 11,
  },
  container: {
    backgroundColor: Colors.white,
    width: DEVICE_WIDTH - PADDING_HORIZONTAL,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    marginLeft: 14.5,
  },
  indicator: {
    position: 'absolute',
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.white,
    left: -8,
    top: 16,
  },
  imageContainer: {
    height: 49,
    width: 49,
    borderRadius: 14,
  },
});

export default styles;
