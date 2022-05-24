import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
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
  projectsList: {
    borderWidth: 1,
    borderColor: Colors.gray4,
    borderRadius: 24,
    padding: 20,
    alignContent: 'flex-start',
  },
});
