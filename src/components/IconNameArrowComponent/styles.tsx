import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {DEVICE_WIDTH} from 'helpers/constants';
import shadows from 'theme/Shadows';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    height: 72,
    paddingVertical: 11,
  },
  container: {
    backgroundColor: Colors.white,
    width: DEVICE_WIDTH - 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 21,
    paddingLeft: 9,
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    height: 70,
    ...shadows.sh3,
  },
  textStyle: {
    marginLeft: 14.5,
  },
});

export default styles;
