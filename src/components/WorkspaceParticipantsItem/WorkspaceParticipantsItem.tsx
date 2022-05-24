import React, {ReactNode} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

import ViewContainer from 'components/ViewContainer/ViewContainer';
import Typography from 'components/Typography/Typography';
import styles from './styles';
import {Colors} from 'theme';
import Spacer from 'components/Spacer/Spacer';
import CloseBtnIcon from 'images/CloseBtnIcon';
import AvatarPlaceholder49 from '../../images/AvatarPlaceholder49';
import {s} from '../ProjectParticipant/ProjectParticipant';

type ChatListItemProps = {
  onPress?: () => void;
  image?: ReactNode | string;
  name?: string;
  email?: string;
};

const WorkspaceParticipantsItem = ({
  onPress,
  image,
  name,
  email,
}: ChatListItemProps) => {
  return (
    <View style={styles.container}>
      <ViewContainer
        flex={1}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <ViewContainer flexDirection="row" alignItems="center">
          {image ? (
            <Image style={s.image} source={{uri: image}} />
          ) : (
            <AvatarPlaceholder49 />
          )}
          <Spacer width={15} />
          <ViewContainer>
            <Typography
              text={name}
              type="labelMedium"
              fontColor={Colors.textBlack}
            />
            <Typography
              text={email}
              type="label"
              fontColor={Colors.textBlack}
            />
          </ViewContainer>
        </ViewContainer>
        <TouchableOpacity onPress={onPress}>
          <CloseBtnIcon />
        </TouchableOpacity>
      </ViewContainer>
    </View>
  );
};

export default WorkspaceParticipantsItem;
