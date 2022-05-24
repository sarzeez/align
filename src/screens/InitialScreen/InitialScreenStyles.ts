import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 40,
    padding: 12,
    paddingBottom: 24,
    justifyContent: 'space-between'
  },
  btnContainer: {
    width: '65%'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textSpacing: {
    marginHorizontal: 24
  },
  orangeText: {
    textDecorationColor: Colors.orange,
    textTransform: 'capitalize'
  },
  bottomContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});