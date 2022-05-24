import { DEVICE_HEIGHT, DEVICE_WIDTH } from 'helpers/constants';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 40,
    padding: 24,
    paddingTop: DEVICE_HEIGHT * 0.05
  },
  scrollview: {
    width: '100%',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    width: DEVICE_WIDTH * 0.8,
    aspectRatio: 3 / 2,
    alignItems: 'center',
    marginVertical: DEVICE_HEIGHT * 0.04
  },
  illustration: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  headingText: {
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 34
  },
  nextButtonStyle: {
    alignSelf: 'center',
    width: '80%',
    height: 56,
    marginBottom: 24
  },
  darkText: {
    textDecorationColor: Colors.black2
  },
  codeContainer: {
    marginTop: 32,
    marginBottom: 24
  }
});

export default styles;
