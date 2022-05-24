import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  container: {
    backgroundColor: Colors.white,
    borderTopRightRadius: 39,
    borderTopLeftRadius: 39,
    marginTop: 70,
    flex: 1,
  },
  headerStyle: {
    marginTop: 10,
    backgroundColor: Colors.white,
    shadowOpacity: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  avatarStyle: {
    width: 112,
    height: 112,
    borderRadius: 20,
  },
  takePicture: {
    marginRight: 15,
  },
  userName: {
    marginHorizontal: 36,
  },
});

export default styles;
