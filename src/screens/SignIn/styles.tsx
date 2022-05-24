import {DEVICE_WIDTH} from 'helpers/constants';
import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

const styles = StyleSheet.create({
  errorContainer: {
    marginLeft: 17,
    flexWrap: 'wrap',
  },
  container: {
    flex: 1,
  },
  main: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
    flexGrow: 1,
  },
  scrollview: {
    marginTop: '5%',
    flex: 1,
    paddingBottom: 20,
  },
  imgContainer: {
    width: DEVICE_WIDTH * 0.44,
    height: DEVICE_WIDTH * 0.44,
    marginBottom: DEVICE_WIDTH * 0.13,
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  bottomRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  nextButtonStyle: {
    width: '100%',
  },
  secureTextStyle: {
    marginLeft: 4,
  },
  smallBtn: {
    width: '48%',
    height: 56,
  },
  forgotPasswordText: {
    fontSize: 17,
    textDecorationLine: 'underline',
    marginVertical: 28,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    borderRadius: 40,
  },
});

export default styles;
