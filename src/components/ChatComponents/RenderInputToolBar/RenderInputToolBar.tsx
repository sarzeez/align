import React, {ReactNode, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import ViewContainer from 'components/ViewContainer/ViewContainer';
import Typography from 'components/Typography/Typography';
import styles from './styles';
import {Colors} from 'theme';
import Input from 'components/Input/Input';
import AddFileIcon from 'images/AddFileIcon';
import ChatSendButton from 'images/ChatSendButton';
import localization from 'localization/localization';
import {Message, Pickers, User} from 'typings/types.common';
import ImagePicker from 'components/ImagePicker/ImagePicker';
import CameraIconFilled from 'images/CameraIconFilled';
import FiledFileIcon from 'images/FiledFileIcon';

type ChatListItemProps = {
  onTextChanged: (value: string | number) => void;
  onSend: (message: Message) => void;
  messageIdGenerator: () => void;
  image?: ReactNode | string;
  placeholder?: string;
  lastMessage?: string;
  text?: string;
  messages: Message;
  user?: User;
  file?: any;
  handleImageFile?: () => void;
};

const RenderInputToolBar = ({
  onTextChanged,
  placeholder,
  onSend,
  text,
  messageIdGenerator,
  user,
  handleImageFile,
  file,
  ...props
}: ChatListItemProps) => {
  const [imageFile, setFileImage] = useState(null);
  const onMessageSend = () => {
    const newMessage = {
      text,
      file: imageFile,
      createdAt: new Date(),
      user,
      _id: messageIdGenerator(),
    };
    onSend(newMessage as any);
    setFileImage(null);
    onTextChanged('');
  };

  const handleFile = (file: any) => {
    setFileImage(file);
  };

  return (
    <ViewContainer style={styles.wrapper}>
      <Input
        onChange={onTextChanged}
        placeholder={placeholder}
        fontSize={12}
        placeholderTextColor={Colors.placeholderColor}
        value={text}
      />
      <ViewContainer
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        style={styles.container}
      >
        <ImagePicker
          cameraType="single"
          actions={[Pickers.Photos, Pickers.Camera, Pickers.Documents]}
          icon={imageFile ? <FiledFileIcon /> : <AddFileIcon />}
          onSelectFile={handleFile}
        />
        <Typography
          text={localization.messages.maxSize}
          type="error"
          fontColor={Colors.labelGrey}
        />
        <TouchableOpacity
          disabled={!text && !imageFile}
          onPress={onMessageSend}
        >
          <ChatSendButton
            backgroundColor={
              text || imageFile ? Colors.orange : Colors.transparent
            }
            color={text || imageFile ? Colors.white : Colors.black}
          />
        </TouchableOpacity>
      </ViewContainer>
      <SafeAreaView edges={['bottom']} style={styles.safeArea} />
    </ViewContainer>
  );
};

export default RenderInputToolBar;
