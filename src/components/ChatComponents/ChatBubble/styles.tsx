import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {DEVICE_WIDTH, PADDING_HORIZONTAL} from 'helpers/constants';

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 13,
    marginBottom: 10,
    backgroundColor: 'red',
    height: 60,
    width: '100%',
  },
  container: {
    backgroundColor: Colors.white,
    width: DEVICE_WIDTH - PADDING_HORIZONTAL,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 12,
    fontFamily: 'inter-Regular',
    color: Colors.messageTextColor,
  },
  bubbleStyle: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    minWidth: 88,
  },
  timeTextStyle: {
    color: Colors.timeTextColor,
    fontSize: 10,
    fontFamily: 'inter-Regular',
  },
  timeContainerStyle: {
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export default styles;
