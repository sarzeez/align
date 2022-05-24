import React, {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';

import ViewContainer from 'components/ViewContainer/ViewContainer';
import Typography from 'components/Typography/Typography';
import styles from './styles';
import {Colors} from 'theme';
import Spacer from 'components/Spacer/Spacer';
import RightArrowIcon from 'images/RightArrowIcon';

type ChatListItemProps = {
  onPress: () => void;
  image?: ReactNode | string;
  name?: string;
};

const IconNameArrowComponent = ({onPress, image, name}: ChatListItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ViewContainer
        flex={1}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <ViewContainer flexDirection="row" alignItems="center">
          {image}
          <Spacer width={15} />
          <Typography text={name} type="h3" fontColor={Colors.textBlack} />
        </ViewContainer>
        <RightArrowIcon />
      </ViewContainer>
    </TouchableOpacity>
  );
};

export default IconNameArrowComponent;
