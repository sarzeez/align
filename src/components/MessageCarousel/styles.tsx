import {StyleSheet} from 'react-native';
import colors from 'theme/Colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 23,
    backgroundColor: colors.gray8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    paddingRight: 10,
  },
  content: {
    // flexDirection: 'row',
    flex: 1,
    // justifyContent: 'space-between',
    paddingRight: 10,
  },
  conatiner: {
    flex: 1,
    borderRightWidth: 2,
    borderRightColor: '#D8D5D5',
  },
  contentInner: {
    // flexDirection: 'row',
    flex: 1,
    // justifyContent: 'space-between',
    paddingRight: 30,
  },
});
