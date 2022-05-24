import React, {ReactNode} from 'react';

import ViewContainer from 'components/ViewContainer/ViewContainer';
import Typography from 'components/Typography/Typography';
import {Colors} from 'theme';
import {styles} from './styles';

const MyAccountItem = ({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string | undefined;
}) => (
  <ViewContainer
    flexDirection="row"
    alignItems="center"
    style={styles.container}
  >
    {icon}
    <Typography
      style={styles.textStyle}
      text={text}
      type="chatName"
      fontColor={Colors.grey2c}
      numberOfLines={2}
    />
  </ViewContainer>
);

export default MyAccountItem;
