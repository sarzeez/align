import {DEVICE_WIDTH} from 'helpers/constants';
import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
  wrapp: {
    backgroundColor: Colors.black,
  },
  container: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerItem: {
    width: 80,
  },
  title: {
    color: Colors.white,
    textAlign: 'center',
  },
  captureBtnWrapp: {
    position: 'absolute',
    width: 68,
    height: 68,
    left: DEVICE_WIDTH / 2 - 32,
    bottom: 16,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureBtn: {
    width: 56,
    height: 56,
    borderRadius: 50,
    backgroundColor: Colors.white,
    zIndex: 100,
  },
  captureBtnDisabled: {
    opacity: 0.1,
  },
  headBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
  },
  shadowBtn: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  primaryBtn: {
    marginLeft: 'auto',
    width: 80,
    paddingHorizontal: 12,
    backgroundColor: Colors.orange,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '900',
    color: Colors.white,
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: DEVICE_WIDTH / 2 - 20,
    width: 40,
  },
  lightningBtn: {
    position: 'absolute',
    bottom: 18,
    left: 16,
    padding: 16,
  },
});
