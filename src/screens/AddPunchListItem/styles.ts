import {Dimensions, StyleSheet} from 'react-native';
import Colors from 'theme/Colors';
import shadows from 'theme/Shadows';

const WIDTH = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  keyboardView: {
    height: '100%',
  },
  scrollViewStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    marginLeft: 17,
    width: 340,
  },
  buttonContainer: {
    marginTop: 12,
    height: 56,
    width: '60%',
    alignSelf: 'center',
  },
  container: {
    paddingHorizontal: 16,
  },
  uploadFileContainer: {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.emptyMessageColor,
    borderRadius: 16,
  },
  box: {
    width: '100%',
    backgroundColor: Colors.white,
    flex: 1,
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gray4,
    height: 97,
    ...shadows.sh1,
  },
  placeholderLabel: {
    width: 230,
    color: Colors.placeholderColor,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  albumGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  markerImageContainer: {
    width: WIDTH - 16,
    alignSelf: 'center',
    height: 300,
    borderRadius: 16,
    backgroundColor: 'red',
    overflow: 'hidden',
  },
});
