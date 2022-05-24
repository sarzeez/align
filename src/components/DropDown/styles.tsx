import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

const styles = StyleSheet.create({
  inputStyle: {
    height: 56,
    borderRadius: 20,
    paddingHorizontal: 17,
    borderColor: Colors.gray4,
    backgroundColor: Colors.white,
  },
  activeStyle: {
    borderColor: Colors.gray4,
  },
  errorStyle: {
    borderColor: Colors.red,
  },
  containerStyle: {
    borderColor: Colors.gray4,
  },
  placeholderStyle: {
    color: Colors.placeholderColor,
    fontSize: 18,
    // fontFamily: 'Inter-Medium',
  },
  textStyle: {
    fontSize: 18,
    // fontFamily: 'Inter-Medium',
    color: Colors.darkBlue,
  },
});

export default styles;
