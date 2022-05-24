import {IS_IPHONE_X} from 'helpers/constants';
import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.emptyMessageColor,
    flex: 1,
    height: '100%',
    marginBottom: IS_IPHONE_X ? -32 : 0,
  },
  modalHeader: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray2,
  },
  modalContent: {
    backgroundColor: Colors.emptyMessageColor,
    flex: 1,
    padding: 40,
  },
  buttonContainer: {
    marginTop: 'auto',
    height: 56,
    width: '60%',
    alignSelf: 'center',
  },
});
