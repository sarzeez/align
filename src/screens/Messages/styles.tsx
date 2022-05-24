import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {IS_IPHONE_X} from 'helpers/constants';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  headingContainer: {
    paddingHorizontal: 28,
  },
  chatListContainer: {
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingVertical: 31,
    backgroundColor: Colors.white,
  },
  deleteButtonStyle: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    width: 72,
  },
  createNewChatButton: {
    position: 'absolute',
    right: 10,
    bottom: IS_IPHONE_X ? 60 : 50,
    height: 49,
    width: 49,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange,
  },
});

export default styles;
