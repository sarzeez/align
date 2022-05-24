import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    padding: 36,
  },
  inputContainer: {
    height: 130,
    position: 'relative',
  },
  seatsContainer: {
    backgroundColor: Colors.white,
    shadowRadius: 2,
    shadowColor: Colors.grey2c,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  seatsCount: {
    width: '100%',
    bottom: 0,
    backgroundColor: Colors.greyf5,
    borderRadius: 20,
    flexDirection: 'row',
    position: 'absolute',
    zIndex: -1,
    height: 80,
    alignItems: 'flex-end',
    paddingLeft: 19,
    paddingBottom: 13,
    shadowColor: Colors.grey2c,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  button: {
    height: 55,
    width: 220,
    borderRadius: 20,
    backgroundColor: Colors.orange,
  },
});

export default styles;
