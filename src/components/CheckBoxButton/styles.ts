import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: Colors.white,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  textStyle: {
    marginLeft: 16,
    fontFamily: 'Inter-Medium',
  },
});
