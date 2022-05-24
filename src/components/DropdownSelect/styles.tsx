import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F7F7',
    borderRadius: 13,
  },
  label: {
    fontFamily: 'Inter-Medium',
    color: Colors.black,
    fontSize: 14,
    paddingHorizontal: 20,
    flex: 1,
  },
  arrow: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: Colors.gray4,
    backgroundColor: Colors.white,
  },
});

export default styles;
