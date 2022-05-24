import {DEVICE_WIDTH} from 'helpers/constants';
import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
  },
  safe: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  block: {
    width: '100%',
    paddingHorizontal: 16,
  },
  mainContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 34,
    paddingVertical: 8,
  },
  scrollview: {
    width: '100%',
    backgroundColor: Colors.emptyMessageColor,
  },
  horizontalContainer: {
    width: '100%',
  },
  itemHorizontal: {
    width: DEVICE_WIDTH * 0.6,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  briefCont: {
    width: '100%',
    paddingHorizontal: 16,
  },
  spacing: {
    marginRight: 8,
  },
  messageCarouselContainer: {
    marginBottom: 20,
    // backgroundColor: '#333'
  },
});
