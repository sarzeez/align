import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import shadows from 'theme/Shadows';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: 56,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    marginHorizontal: 36,
    ...shadows.sh3,
  },
  textStyle: {
    flex: 1,
    marginHorizontal: 12,
  },
});
