import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'theme';
import {DEVICE_WIDTH, DEVICE_HEIGHT} from 'helpers/constants';

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.emptyMessageColor,
  },
  container: {},
  block: {
    width: '100%',
  },
  workspaceTitleCont: {
    marginTop: 24,
  },
  participantsContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    width: '100%',
    borderTopRightRadius: 34,
    borderTopLeftRadius: 34,
    paddingHorizontal: 16,
  },
  addBtn: {
    backgroundColor: Colors.orange,
    borderRadius: 8,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
