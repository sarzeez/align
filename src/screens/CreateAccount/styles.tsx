import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

const styles = StyleSheet.create({
  errorContainer: {
    marginLeft: 17,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  block: {
    width: '100%',
  },
  nextButtonStyle: {
    alignSelf: 'center',
    width: '80%',
    height: 56,
  },
  secureTextStyle: {
    marginLeft: 4,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 40,
  },
  headingText: {
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 34,
  },
  scrollview: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  main: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 28,
  },
  lockIcon: {
    marginRight: 12,
  },
  fontStyle: {
    fontFamily: 'inter-italic',
    fontStyle: 'italic',
  },
});

export default styles;
