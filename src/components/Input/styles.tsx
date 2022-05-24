import {StyleSheet} from 'react-native';
import shadows from 'theme/Shadows';

export const styles = StyleSheet.create({
  errorIconContainer: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    right: 17,
  },
  leftComponent: {
    position: 'absolute',
    left: 0,
  },
  rightComponent: {
    position: 'absolute',
    right: 0,
  },
  errorContainerStyle: {
    right: 65,
  },
  hideShowButtonStyle: {
    right: 15,
  },
  withShadow: {
    ...shadows.sh3,
  },
  fakeInputStyle: {
    flex: 1,
  },
});
