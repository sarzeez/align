import {DEVICE_WIDTH} from 'helpers/constants';
import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 16,
  },
  empty: {
    width: '100%',
    padding: 32,
    backgroundColor: Colors.gray8,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  plusButton: {
    width: 28,
    height: 28,
  },
  contentContainer: {
    width: '100%',
    marginTop: 12,
  },
});
