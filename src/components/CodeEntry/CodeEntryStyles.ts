import { DEVICE_HEIGHT } from 'helpers/constants';
import { StyleSheet } from 'react-native';
import { Colors, Shadows } from 'theme';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'
  },
  digitInputContainer: {
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: 40,
    ...Shadows.sh2
  },
  inputCont: {
    width: 0,
  },
  hiddenInput: {
    width: 10,
    height: 10,
    position: 'absolute',
    bottom: -DEVICE_HEIGHT * 0.05,
    left: -DEVICE_HEIGHT,
    zIndex: -5
  },
  valueText: {
    fontSize: 28
  }
});

export default styles;