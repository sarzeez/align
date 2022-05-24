import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

const styles = StyleSheet.create({
  newMessagesStyle: {
    backgroundColor: Colors.emptyMessageColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    marginBottom: 60,
    marginHorizontal: 15,
    flexGrow: 1,
    borderRadius: 26,
  },
});

export default styles;
