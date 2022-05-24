import {IS_IOS} from 'helpers/constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  picker: {
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: IS_IOS ? -2 : -4,
    marginLeft: 2,
  },
});
