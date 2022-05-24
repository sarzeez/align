import React from 'react';
import {TouchableOpacity, Image, View} from 'react-native';

import ViewContainer from 'components/ViewContainer/ViewContainer';
import styles from './styles';
import AvatarPlaceholder from "../../images/AvatarPlaceholder49";
import Typography from 'components/Typography/Typography';
import AssigneeCheckedIcon from 'images/AssigneeCheckedIcon';
import Spacer from 'components/Spacer/Spacer';

type ChangeAssignmentItemProps = {
  onPress?: () => void;
  isChecked?: boolean;
  name?: string;
  avatar?: string;
};

const ChangeAssignmentItem = ({
  onPress,
  isChecked,
  name,
  avatar,
}: ChangeAssignmentItemProps) => {
  return (
    <ViewContainer
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      style={styles.itemContainer}
    >
      <ViewContainer flexDirection="row" alignItems="center">
        {avatar ? (
          <Image source={{uri: avatar}} style={styles.itemAvatar} />
        ) : (
          <AvatarPlaceholder />
        )}
        <Spacer width={12} />
        <Typography text={name} />
      </ViewContainer>
      <TouchableOpacity onPress={onPress}>
        {isChecked ? (
          <AssigneeCheckedIcon />
        ) : (
          <View style={styles.unChecked} />
        )}
      </TouchableOpacity>
    </ViewContainer>
  );
};

export default ChangeAssignmentItem;
