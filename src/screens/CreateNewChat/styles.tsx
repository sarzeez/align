import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  headingContainer: {
    paddingHorizontal: 28,
  },
  chatListContainer: {
    paddingVertical: 25,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    flex: 1,
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
    bottom: 20,
    height: 49,
    width: 49,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange,
  },
});

export default styles;
