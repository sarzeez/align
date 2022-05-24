import {DEVICE_HEIGHT, DEVICE_WIDTH} from 'helpers/constants';
import {StyleSheet} from 'react-native';
import Colors from 'theme/Colors';

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
    paddingHorizontal: 8,
    paddingBottom: 30,
  },
  backdrop: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    backgroundColor: Colors.backdrop,
    position: 'absolute',
    flexDirection: 'column',
  },
  content: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingVertical: 4,
    zIndex: 1,
    shadowColor: Colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
  },
  cancelButton: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.orange,
    textAlign: 'center',
    padding: 14,
    height: 54,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    margin: 20,
  },
});
