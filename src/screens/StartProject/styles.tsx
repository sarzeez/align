import {StyleSheet} from 'react-native';
import Colors from 'theme/Colors';

const styles = StyleSheet.create({
  errorContainer: {
    marginLeft: 17,
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '60%',
    height: 56,
    marginBottom: 50,
  },
  mainContainer: {
    paddingTop: 28,
    paddingHorizontal: 16,
    flex: 1,
  },
  keyboardView: {
    height: '100%',
  },
  bottomRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  orangeText: {
    textDecorationColor: Colors.orange,
    textTransform: 'capitalize',
  },
  scrollViewStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  flex1: {
    flex: 1,
  },
  inputContainerStyle: {
    flex: 1,
    width: 'auto',
  },
  googlePlaceContainer: {
    maxHeight: 400,
    flex: 0,
  },
  googlePlaceInput: {
    width: 300,
    fontSize: 18,
    height: 56,
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.gray4,
    fontFamily: 'Inter-Regular',
    paddingHorizontal: 17,
  },
  googlePlaceInputContainer: {
    width: '100%',
  },
  poweredContainer: {
    display: "none"
  },
});

export default styles;
