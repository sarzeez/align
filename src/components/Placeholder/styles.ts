import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingVertical: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderTitle: {
    fontWeight: '900',
    marginBottom: 4,
  },
  placeholderText: {
    color: Colors.gray7,
    textAlign: 'center',
  },
});

export default styles;
