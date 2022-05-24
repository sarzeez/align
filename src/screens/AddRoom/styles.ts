import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
  errorContainer: {
    marginLeft: 17,
    width: 340,
  },
  nextButtonStyle: {
    width: '100%',
  },
  secureTextStyle: {
    marginLeft: 4,
  },
  buttonContainer: {
    marginTop: 12,
    height: 56,
    width: '60%',
    alignSelf: 'center',
    backgroundColor: Colors.emptyMessageColor,
  },
  container: {
    paddingHorizontal: 16,
  },
  box: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 24,
    flex: 1,
  },
  boxSm: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 20,
    flex: 1,
  },
  tabs: {
    backgroundColor: Colors.emptyMessageColor,
  },
  tabContainer: {
    height: 410,
    flexGrow: 1,
    flex: 1,
  },
  tabBar: {
    backgroundColor: Colors.white,
    color: Colors.black,
  },
  tabBarText: {
    fontWeight: '700',
    color: Colors.black,
  },
  tabBarIndicator: {
    backgroundColor: Colors.orange,
    height: 4,
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  placeholderLabel: {
    width: 230,
    color: Colors.placeholderColor,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  tabContent: {
    padding: 16,
    flex: 1,
  },
  albumGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  albumText: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    color: Colors.placeholderColor,
  },
  photoContainer: {
    height: 100,
    width: '50%',
    padding: 4,
    position: 'relative',
  },
  photoContainerLg: {
    width: '100%',
    height: '100%',
  },
  photo: {
    backgroundColor: Colors.gray4,
    borderRadius: 8,
    width: '100%',
    height: '100%',
  },
  photoLg: {
    borderRadius: 24,
    width: '100%',
    height: '100%',
  },
  titleWrapp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  deleteButton: {
    position: 'absolute',
    top: 40,
    left: 14,
    zIndex: 1000,
  },
  deleteButtonLg: {
    width: 44,
    height: 44,
    position: 'absolute',
    top: 70,
    left: 16,
    backgroundColor: Colors.white,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  retakeButton: {
    position: 'absolute',
    top: 5,
    left: 12,
    zIndex: 1000,
  },
  retakeButtonLg: {
    width: 44,
    height: 44,
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderRadius: 12,
  },
  bottomRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  orangeText: {
    textDecorationColor: Colors.orange,
    textTransform: 'capitalize',
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -8,
    marginLeft: -8,
  },
});
