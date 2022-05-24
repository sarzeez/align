import React from 'react';
import {TouchableOpacity} from 'react-native';

import Typography from 'components/Typography/Typography';
import localization from 'localization/localization';
import Spacer from 'components/Spacer/Spacer';
import NewMessageRoomIcon from 'images/NewMessegeRoomIcon';
import styles from './styles';

const EmptyMessages = ({onPress}: {onPress: () => void}) => (
  <TouchableOpacity onPress={onPress} style={styles.newMessagesStyle}>
    <NewMessageRoomIcon />
    <Spacer height={17} />
    <Typography text={localization.messages.noMessages} />
    <Spacer height={13} />
    <Typography text={localization.messages.tapeHere} />
  </TouchableOpacity>
);

export default EmptyMessages;
