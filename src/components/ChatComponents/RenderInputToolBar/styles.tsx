import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {DEVICE_WIDTH, PADDING_HORIZONTAL} from 'helpers/constants';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 20
  },
  container: {
    marginTop: 4,
  },
  safeArea: {
    backgroundColor: Colors.white,
    width: '100%',
  },
});

export default styles;
