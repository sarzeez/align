import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 62,
    backgroundColor: Colors.gray8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 'auto',
  },
});
