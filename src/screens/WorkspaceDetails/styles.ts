import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'theme';
import {DEVICE_WIDTH, DEVICE_HEIGHT} from 'helpers/constants';
import shadows from "theme/Shadows";

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.emptyMessageColor,
  },
  container: {},
  block: {
    width: '100%',
    paddingHorizontal: 16,
  },
  workspaceTitleCont: {
    marginTop: 24,
  },
  participantsContainer: {
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 34,
    paddingHorizontal: 24,
    paddingBottom: 24,
    ...shadows.sh3,
  },
  buttonStyle: {
    width: 220,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    backgroundColor: Colors.gray4,
    marginVertical: 42,
  },
});

export default styles;
