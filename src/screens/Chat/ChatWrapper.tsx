import React, {useState} from 'react';

import Chat from './Chat';
import {RouteProp} from '@react-navigation/native';

type ChatWrapperProps = {
  route: RouteProp<
    {
      ChatProps: {
        chatId: number;
      };
    },
    'ChatProps'
  >;
};

const ChatWrapper = ({route}: ChatWrapperProps) => {
  const [isOpened, openDeleteCheckbox] = useState<boolean>(false);
  return (
    <Chat
      chatId={route.params?.chatId}
      isOpened={isOpened}
      openDeleteCheckbox={openDeleteCheckbox}
    />
  );
};

export default ChatWrapper;
