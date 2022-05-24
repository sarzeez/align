import {StyleSheet} from 'react-native';
import {DEVICE_WIDTH, PADDING_HORIZONTAL} from 'helpers/constants';
import {Colors} from 'theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray4
  },
  textStyle: {
    marginLeft: 16,
  },
  blackTextStyle: {
    fontFamily: 'Inter-Medium',
  },
  orangeTextStyle: {
    fontFamily: 'Inter-Medium',
    textDecorationLine: 'underline'
  }
});

export default styles;