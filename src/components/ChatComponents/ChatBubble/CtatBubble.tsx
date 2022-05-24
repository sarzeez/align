import React, {ReactNode, useEffect} from 'react';
import {Bubble, Time} from 'react-native-gifted-chat';

import styles from './styles';
import {Colors} from 'theme';
import {Image, TouchableOpacity, View} from 'react-native';
import EmptyCheckBox from 'images/EmptyChreckBox';
import FilledCheckBox from 'images/FilledCheckBox';

type ChatListItemProps = {
  image?: ReactNode | string;
  name?: string;
  currentMessage?: any;
  text?: string;
  user: any;
  onLongPress: (id: number) => void;
  onSelectMessage: (id: number) => void;
  isOpened?: boolean;
  selectedMessages?: number[];
  extraData?: any[];
};

const ChatBubble = (props: ChatListItemProps) => {
  const messageIsSelected = props.selectedMessages?.includes(
    props?.currentMessage?.pk,
  );

  const handleLongPress = () => {
    props.onLongPress(props?.currentMessage?.pk);
  };

  const bubleStyleStyle = props?.currentMessage.image ? {...styles.bubbleStyle, width: 274, height: 145, justifyContent: 'flex-start'} : styles.bubbleStyle

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {props?.extraData?.length && props?.extraData[0] && (
        <TouchableOpacity
          style={{left: 0}}
          onPress={() => props?.onSelectMessage(props?.currentMessage?.pk)}
        >
          {messageIsSelected ? <FilledCheckBox /> : <EmptyCheckBox />}
        </TouchableOpacity>
      )}

      <TouchableOpacity onLongPress={handleLongPress}>
        <Bubble
          {...props}
          renderTime={(args: any) => (
            <View style={styles.timeContainerStyle}>
              <Time
                {...args}
                timeTextStyle={{
                  left: styles.timeTextStyle,
                  right: styles.timeTextStyle,
                }}
              />
            </View>
          )}
          wrapperStyle={{
            left: [
              bubleStyleStyle,
              {backgroundColor: Colors.white, marginLeft: 15},
            ],
            right: [
              bubleStyleStyle,
              {backgroundColor: Colors.myMessagesBgColor, marginRight: 15},
            ],
          }}
          textStyle={{
            left: [styles.textStyle],
            right: [styles.textStyle],
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChatBubble;
