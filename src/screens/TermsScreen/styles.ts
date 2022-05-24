import { DEVICE_WIDTH } from 'helpers/constants';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 40,
    padding: 24
  },
  headingText: {
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 34
  },
  decorLine: {
    marginVertical: 24,
    height: 1,
    width: '100%',
    backgroundColor: Colors.gray2,
    borderRadius: 1
  },
  webView: {
    borderRadius: 16,
    marginBottom: 24
  },
  largeButtonStyle: {
    alignSelf: 'center',
    width: '100%',
    height: 56
  },
});

export default styles;