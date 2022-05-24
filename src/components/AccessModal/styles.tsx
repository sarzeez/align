import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backdrop,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headingStyle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.black,
  },
  descriptionStyle: {
    fontSize: 13,
    lineHeight: 16,
    color: Colors.gray3,
  },
  dontAllowButton: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '100%',
    textAlign: 'center',
    borderRadius: 12,
    backgroundColor: Colors.gray7,
    color: Colors.white,
    overflow: 'hidden',
  },
  allowButton: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '100%',
    textAlign: 'center',
    borderRadius: 12,
    backgroundColor: Colors.orange,
    color: Colors.white,
    overflow: 'hidden',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 24,
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  modalInnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingTop: 19,
    borderRadius: 40,
    marginHorizontal: 16,
    width: 270,
  },
});
