import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
  buttonStyle: {
    position: 'relative',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  smallStyle: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  disabledStyles: {
    backgroundColor: Colors.disabledButtonBackgroundColor,
    borderColor: Colors.disabledButtonBackgroundColor,
    borderWidth: 1,
  },
  withFullWidth: {
    width: '100%',
  },
  leftIconStyle: {
    position: 'absolute',
    left: 24,
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
  },
  leftIconAlignToTextStyle: {
    marginRight: 10,
  },
  transparentStyle: {
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.blue,
    height: 56,
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
