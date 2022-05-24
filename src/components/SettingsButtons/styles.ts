import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

const styles = StyleSheet.create({
  wrapperStyle: {
    width: '100%',
  },
  containerStyle: {
    height: 72,
    borderColor: Colors.dividerColor,
    borderBottomWidth: 1,
    width: '100%',
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderTop: {
    borderTopWidth: 1,
    borderBottomWidth: 0,
  },
  textStyle: {
    marginLeft: 17,
  },
});

export default styles;
