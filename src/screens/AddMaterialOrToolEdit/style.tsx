import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F7F7',
  },
  addMaterialToolHeader: {
    padding: 30,
    paddingBottom: 20,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  progress: {
    flex: 1,
    height: 23,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: '#DBDBDB',
  },
  loadingHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabs: {
    backgroundColor: Colors.emptyMessageColor,
  },
  tabContainer: {},
  tabContent: {},
  sceneContainerStyle: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  tabBar: {
    backgroundColor: Colors.white,
    color: Colors.black,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  tabBarText: {
    fontWeight: '700',
    color: Colors.black,
  },
  tabBarIndicator: {
    backgroundColor: Colors.orange,
    height: 4,
  },

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
  selectToolDropdown: {
    height: 56,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 17,
    borderColor: Colors.gray4,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectToolDropdownText: {
    fontSize: 18,
    // color: Colors.placeholderColor,
  },
});
