import {DEVICE_HEIGHT, DEVICE_WIDTH} from 'helpers/constants';
import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 40,
  },
  scrollview: {
    flex: 1,
    padding: 24,
  },
  centered: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    width: DEVICE_WIDTH * 0.65,
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
    marginVertical: 16,
  },
  descriptionText: {
    marginBottom: 30,
  },
  errorContainer: {
    marginTop: 5,
  },
  nextButtonStyle: {
    alignSelf: 'center',
    width: '70%',
    height: 56,
    marginTop: 24,
  },
  inputBlock: {
    flex: 1,
  },
  secureTextStyle: {
    marginLeft: 4,
  },
});

export default styles;
