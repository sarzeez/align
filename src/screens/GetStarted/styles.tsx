import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 40,
    padding: 12,
    paddingBottom: 24,
    justifyContent: 'space-between'
  },
  nextButtonStyle: {
    alignSelf: 'center',
    width: '80%',
    height: 56
  },
  headingText: {
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 34
  },
  main: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  headingContainer: {
    width: '100%'
  },
  block: {
    width: '100%',
  },
  checkboxesContainer: {
    position: 'relative',
    paddingHorizontal: 24
  },
  decorLine: {
    width: 8,
    height: 216,
    backgroundColor: Colors.black,
    position: 'absolute',
    left: 0
  },
  checkboxesPadding: {
    paddingTop: 12
  }
});

export default styles;
