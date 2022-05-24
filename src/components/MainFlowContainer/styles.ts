import {IS_IPHONE_X} from 'helpers/constants';
import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: Colors.emptyMessageColor,
  },
  safe: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  main: {
    height: '100%',
    marginBottom: IS_IPHONE_X ? -34 : 0,
  },
  box: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 36,
  },
  heroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  titleContainer: {
    paddingVertical: 28,
    height: 105,
  },
  imageContainer: {
    marginRight: 16,
  },
  titleLabel: {
    fontSize: 16,
  },
  title: {
    lineHeight: 28,
  },
  titleButton: {
    marginLeft: 'auto',
  },
  text: {
    fontSize: 14,
    lineHeight: 18,
    flexWrap: 'wrap',
    paddingRight: 16,
    marginRight: 16,
  },
});
