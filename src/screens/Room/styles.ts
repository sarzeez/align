import {DEVICE_WIDTH} from 'helpers/constants';
import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    position: 'relative',
  },
  image: {
    height: 268,
    backgroundColor: Colors.emptyMessageColor,
    borderRadius: 24,
    overflow: 'hidden',
  },
  indicatorContainer: {
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainerAbsolute: {
    position: 'absolute',
    left: DEVICE_WIDTH / 2 - 12,
    zIndex: 1000,
    height: '100%',
    transform: [
      {
        translateY: -10,
      },
    ],
  },
  addBtn: {
    backgroundColor: Colors.orange,
    borderRadius: 8,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  addBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 6,
  },
  carousel: {
    marginLeft: -8,
    marginTop: -16,
  },
  pagination: {
    marginTop: -20,
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '60%',
    height: 56,
    marginBottom: 50,
  },
});
