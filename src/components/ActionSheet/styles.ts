import {DEVICE_HEIGHT, DEVICE_WIDTH, IS_IOS} from 'helpers/constants';
import {StyleSheet} from 'react-native';
import colors from 'theme/Colors';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 1,
    top: 0,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    zIndex: 10000,
  },
  backdrop: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    backgroundColor: colors.backdrop,
    position: 'absolute',
    flexDirection: 'column',
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingVertical: 10,
    paddingBottom: IS_IOS ? 15 : 30,
    zIndex: 1,

    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
