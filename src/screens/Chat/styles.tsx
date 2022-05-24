import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import { DEVICE_WIDTH, IS_IPHONE_X, PADDING_HORIZONTAL } from "helpers/constants";

const styles = StyleSheet.create({
  deleteContainer: {
    backgroundColor: Colors.white,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: IS_IPHONE_X ? 120 : 80,
  },
  wrapper: {
    backgroundColor: Colors.white,
    height: 72,
    paddingVertical: 11,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 0,
    maxWidth: 170,
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
