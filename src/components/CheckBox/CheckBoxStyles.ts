import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
  container: {
    height: 26,
    width: 26,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unchecked: {
    borderColor: Colors.gray3,
  },
  checked: {
    borderColor: Colors.orange,
    backgroundColor: Colors.orange,
  },
});
