import {DEVICE_WIDTH} from 'helpers/constants';
import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH * 0.45,
    minHeight: DEVICE_WIDTH * 0.45,
    backgroundColor: Colors.gray8,
    borderRadius: 24,
    padding: 10,
    justifyContent: 'space-between',
  },
  textBlock: {
    marginVertical: 10,
  },
  bottomRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  col: {
    width: '48%',
    padding: 4,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
