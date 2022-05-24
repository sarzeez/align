import {DEVICE_HEIGHT, DEVICE_WIDTH} from 'helpers/constants';
import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 40,
    padding: 24,
    paddingTop: DEVICE_HEIGHT * 0.05,
  },
  scrollview: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centered: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    width: DEVICE_WIDTH * 0.8,
    aspectRatio: 3 / 2,
    alignItems: 'center',
    marginVertical: DEVICE_HEIGHT * 0.04,
  },
  illustration: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  headingText: {
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 34,
  },
  errorContainer: {
    marginLeft: 17,
  },
  nextButtonStyle: {
    alignSelf: 'center',
    width: '80%',
    height: 56,
    marginBottom: 24,
  },
  secureTextStyle: {
    marginLeft: 4,
  },
  haveAnAccount: {
    marginBottom: 30,
  },
});

export default styles;
