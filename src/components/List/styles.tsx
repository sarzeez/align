import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
  list: {
    backgroundColor: Colors.white,
    flexGrow: 0,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  listItem: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    fontWeight: '500',
    fontSize: 14,
  },
});
