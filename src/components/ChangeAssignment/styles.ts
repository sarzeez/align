import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';
import { DEVICE_WIDTH, IS_IPHONE_X } from "helpers/constants";

const HORIZONTAL_PADDING = 30;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.white,
    height: 55,
    width: DEVICE_WIDTH - HORIZONTAL_PADDING,
    borderRadius: 18,
    paddingLeft: 7,
    paddingRight: 22,
  },
  itemAvatar: {
    width: 42,
    height: 42,
    borderRadius: 14,
  },
  unChecked: {
    height: 26,
    width: 26,
    borderWidth: 1,
    borderColor: Colors.gray4,
    borderRadius: 8,
  },
  container: {
    paddingHorizontal: 33,
  },
  indicatorContainer: {
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexGrow: {
    flexGrow: 1,
  },
  addBtn: {
    backgroundColor: Colors.orange,
    borderRadius: 8,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    padding: 15,
  },
  buttonContainer: {
    width: 220,
    height: 55,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
});

export default styles;
