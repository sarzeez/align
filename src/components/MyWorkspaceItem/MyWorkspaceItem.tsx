import React, {ReactNode} from 'react';

import ViewContainer from 'components/ViewContainer/ViewContainer';
import Typography from 'components/Typography/Typography';
import {Colors} from 'theme';

const MyWorkspaceItem = ({icon, text}: {icon: ReactNode; text: string}) => (
  <ViewContainer
    flexDirection="row"
    alignItems="center"
    style={{
      height: 55,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: Colors.dividerColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowColor: Colors.shadowColor,
      marginHorizontal: 36,
    }}
  >
    {icon}
    <Typography
      style={{marginLeft: 12}}
      text={text}
      type="chatName"
      fontColor={Colors.grey2c}
    />
  </ViewContainer>
);

export default MyWorkspaceItem;
