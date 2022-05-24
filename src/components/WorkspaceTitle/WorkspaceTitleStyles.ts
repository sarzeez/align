import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
  wrapp: {
    paddingHorizontal: 16,
  },
  container: {
    width: '100%',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
  },
  label: {
    fontWeight: '700',
  },
});
