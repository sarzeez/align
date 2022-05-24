import {StyleSheet} from 'react-native';
import colors from 'theme/Colors';

export const styles = StyleSheet.create({
  containaer: {
    width: 100,
    height: 200,
    backgroundColor: 'red',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 28,
  },
  headerIcon: {
    width: 44,
    height: 44,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});
