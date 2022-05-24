import { DEVICE_HEIGHT } from 'helpers/constants';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 40,
    padding: 24
  },
  scrollview: {
  },
  main: {
    flex: 1,
    justifyContent: 'center'
  },
  stepTwoRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  headingText: {
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 34,
  },
  nextButtonStyle: {
    alignSelf: 'center',
    width: '80%',
    height: 56,
    marginTop: DEVICE_HEIGHT * 0.08,
    marginBottom: 24,
  },
  centered: {
    width: '100%',
    alignItems: 'center'
  },
  headingContainer: {
    width: '100%',
    marginBottom: DEVICE_HEIGHT * 0.04
  },
  errorContainer: {
    marginLeft: 17,
    flexWrap: 'wrap',
    width: 200,
  },
  secureTextStyle: {
    marginLeft: 4,
  },
  buttonContainer: {

  },
});

export default styles;
