import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  scrollView: {
    backgroundColor: Colors.white,
  },
  headerStyle: {
    marginTop: 10,
    backgroundColor: Colors.transparent,
    shadowOpacity: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  block: {
    marginVertical: 20,
  },
  nextButtonStyle: {
    alignSelf: 'center',
    width: '80%',
    height: 56,
  },
  main: {
    alignItems: 'center',
    paddingHorizontal: 36,
    flex: 1,
  },
  submitButton: {
    height: 55,
    width: 220,
    borderRadius: 20,
    backgroundColor: Colors.orange,
  },
  container: {
    marginBottom: 60,
  },
  imageContainer: {
    width: 112,
    height: 112,
    borderRadius: 14,
  },
  imagePicker: {
    position: 'absolute',
    right: -24,
    bottom: -15,
    zIndex: 9999,
  },
});

export default styles;
