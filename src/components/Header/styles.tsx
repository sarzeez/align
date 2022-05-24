import {StyleSheet} from 'react-native';

import {Colors} from 'theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowColor: Colors.shadowColor,
    paddingTop: 50,
    paddingBottom: 4,
    marginTop: -50,
    zIndex: 10,
  },
  headItem: {
    width: 80,
  },
  rightContainer: {
    position: 'absolute',
    right: 24,
    bottom: 10,
  },
  leftHeading: {
    justifyContent: 'flex-start',
  },
  authStyle: {
    backgroundColor: Colors.blue,
  },
  withBorderRadius: {
    height: 100,
    borderTopRightRadius: 42,
    borderTopLeftRadius: 42,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dividerColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowColor: Colors.transparent,
    paddingTop: 31,
  },
  backButton: {
    height: 54,
    width: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    paddingRight: 5,
    shadowRadius: 2,
    shadowColor: Colors.grey2c,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  head: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    paddingHorizontal: 16,
  },
  headBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
  },
  shadowBtn: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  img: {
    height: 24,
    width: 110,
    resizeMode: 'stretch',
  },
});
