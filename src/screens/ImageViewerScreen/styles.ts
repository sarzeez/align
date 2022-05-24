import {StyleSheet} from 'react-native';

import {Colors} from 'theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  bottomContainer: {
    alignItems: 'center',
    position: 'absolute',
    left: 16,
    right: 16,
  },
});

export const backBtnStyle = (topOffset: number) => {
  return {...styles.backBtn, top: topOffset + 8};
};

export const bottomContainerStyle = (bottomInset: number) => {
  return {
    ...styles.bottomContainer,
    bottom: bottomInset,
  };
};
