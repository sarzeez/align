import React, {useState, useCallback, useEffect} from 'react';
import {Image, Keyboard} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp, StackActions, useNavigation} from '@react-navigation/native';
import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import ImageView from 'react-native-image-viewing';

import ChatBubble from 'components/ChatComponents/ChatBubble/CtatBubble';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import localization from 'localization/localization';
import Header from 'components/Header/Header';
import {
  getMessages,
  deleteMessages,
  clearMessages,
} from 'store/actions/messages.actions';
import {Colors} from 'theme';
import Input from 'components/Input/Input';
import shadows from 'theme/Shadows';
import RenderInputToolBar from 'components/ChatComponents/RenderInputToolBar/RenderInputToolBar';
import styles from './styles';
import {setAppLoading} from 'store/actions/auth.actions';
import appConfig from 'config/appConfig';
import {showRequestErrorMessage} from 'helpers/functions';
import {getToken} from 'store/reducers/auth.reducer';
import {getProfile} from 'store/reducers/profile.reducer';
import {useSocket} from 'helpers/hooks';
import DeleteMessageIcon from 'images/DeleteMessageIcon';
import {IS_IOS, IS_IPHONE_X} from 'helpers/constants';
import Typography from 'components/Typography/Typography';
import AvatarPlaceHolder from '../../images/AvatarPlaceholder49';
import {typesOfAccount} from '../../typings/types.common';
import {getSingleChatMessagesSelector} from '../../store/reducers/messages.reducer';

type ChatProps = {
  route: RouteProp<
    {
      ChatProps: {
        chatItem: any;
        id: number;
        withBackPress: boolean;
      };
    },
    'ChatProps'
  >;
};

const CancelButton = ({onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: 89,
      height: 49,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.orange,
      borderRadius: 14,
      ...shadows.sh3,
    }}
  >
    <Typography text="Cancel" type="label" fontColor={Colors.white} />
  </TouchableOpacity>
);

const Heading = ({image, isActive, name, lastMessage}) => {
  return (
    <TouchableOpacity style={styles.container} disabled>
      <View style={styles.imageContainer}>
        {image ? (
          typeof image === 'string' ? (
            <Image source={{uri: image as any}} style={styles.imageContainer} />
          ) : (
            image
          )
        ) : (
          <AvatarPlaceHolder />
        )}
        <View
          style={[
            styles.indicator,
            {
              backgroundColor: isActive
                ? Colors.activeGreen
                : Colors.dividerColor,
            },
          ]}
        />
      </View>
      <ViewContainer justifyContent="center" style={styles.textStyle} flex={1}>
        <ViewContainer
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            text={name || 'Darlene Steward'}
            type={'chatName'}
            fontColor={Colors.textBlack}
          />
        </ViewContainer>
        <Typography
          text={lastMessage}
          type="label"
          fontColor={Colors.darkGrey}
        />
      </ViewContainer>
    </TouchableOpacity>
  );
};

const Chat = ({route}: ChatProps) => {
  const dispatch = useDispatch();
  const {dispatch: navDispatch} = useNavigation();
  const [messages, setMessages] = useState([]);
  const [images, setImages] = useState([]);
  const [isOpened, openDeleteCheckbox] = useState<boolean>(false);
  const [visible, setIsVisible] = useState<boolean>(false);
  const [selectedMessages, setSelectedmessages] = useState<number[]>([]);
  const token = useSelector(getToken);
  const messagesResp = useSelector(getSingleChatMessagesSelector);
  const userProfile = useSelector(getProfile);
  const chatItem = route.params?.chatItem;
  const id = route.params?.id;
  const withBackPress = route?.params?.withBackPress;
  const socket = useSocket(chatItem?.pk || id);
  useEffect(() => {
    socket.connect();

    return () => {
      socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMessages = () => {
    const messagesList = messagesResp?.map(item => ({
      ...item,
      _id: item.pk,
      text: item.message,
      user: {_id: item.sender},
      createdAt: item.created,
      image: item.file,
    }));
    setMessages(messagesList);
  };

  useEffect(() => {
    handleMessages();
  }, [messagesResp]);

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMessages(chatItem?.pk || id));
  }, [chatItem?.pk, dispatch, id]);

  const onSend = useCallback(
    async (message = []) => {
      const formData = new FormData();
      formData.append('message', message[0].text);
      if (message[0].file) {
        formData.append('file', message[0].file);
      }
      try {
        const resp = await fetch(
          `${appConfig.baseUrl}/chats/messages/${id || chatItem?.pk}/`,
          {
            method: 'POST',
            headers: {
              Accept: '*/*',
              Authorization: `JWT ${token}`,
            },
            body: formData,
          },
        );
      } catch (error) {
        showRequestErrorMessage(JSON.stringify(error));
      } finally {
        dispatch(setAppLoading(false));
      }
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, message),
      );
    },
    [dispatch, token],
  );

  const onLongPress = () => {
    openDeleteCheckbox(true);
  };

  const onDeleteMessage = () => {
    if (selectedMessages?.length) {
      dispatch(setAppLoading(true));
      Promise.all([
        dispatch(deleteMessages(chatItem?.pk || id, selectedMessages)),
      ])
        .then(([resp]) => dispatch(getMessages(chatItem?.pk || id)))
        .catch(err => console.log(err))
        .finally(() => {
          cancelDeleting();
          dispatch(setAppLoading(false));
        });
    }
  };

  const onSelectMessage = (id: number) => {
    let newMessagesIds;
    if (selectedMessages.includes(id)) {
      newMessagesIds = selectedMessages.filter(item => item !== id);
    } else {
      newMessagesIds = [...selectedMessages, id];
    }
    setSelectedmessages(newMessagesIds);
  };

  const cancelDeleting = () => {
    setSelectedmessages([]);
    openDeleteCheckbox(false);
  };

  const setCurrentImage = uri => {
    setImages([{uri}]);
    setIsVisible(true);
  };

  return (
    <ViewContainer flex={1}>
      <SafeAreaView style={{flex: 1}}>
        <Header
          withBackButton
          chatScreen
          backPress={
            withBackPress ? () => navDispatch(StackActions.pop(2)) : null
          }
          heading={
            <Heading
              isActive={chatItem?.is_online}
              name={chatItem?.name || chatItem?.full_name}
              image={chatItem?.avatar}
              lastMessage={
                !!chatItem?.contractor
                  ? typesOfAccount.contractor
                  : typesOfAccount.subContractor
              }
            />
          }
          rightComponent={isOpened && <CancelButton onPress={cancelDeleting} />}
          rightContainerStyle={{right: 15, bottom: 12}}
        />

        <GiftedChat
          showUserAvatar={false}
          extraData={[isOpened]}
          renderAvatar={null}
          placeholder="Send a message…"
          messages={messages}
          keyboardShouldPersistTaps="always"
          onSend={messages => onSend(messages)}
          bottomOffset={IS_IOS ? 0 : -60}
          shouldUpdateMessage={(props, nextProps) =>
            props.extraData !== nextProps.extraData
          }
          listViewProps={{
            onEndReachedThreshold: 0,
            keyboardDismissMode: 'on-drag',
            keyboardShouldPersistTaps: 'always',
          }}
          renderMessageImage={props => (
            <TouchableOpacity
              onPress={() => setCurrentImage(props.currentMessage.image)}
            >
              <View
                style={{
                  width: 173,
                  height: 85,
                }}
              >
                <View
                  style={{
                    width: 173,
                    height: 85,
                    position: 'absolute',
                    right: -11,
                    bottom: -11,
                    backgroundColor: Colors.gray10,
                    zIndex: -1,
                    borderRadius: 12,
                  }}
                />
                <View
                  style={{
                    width: 173,
                    height: 85,
                    position: 'absolute',
                    right: -22,
                    bottom: -22,
                    backgroundColor: Colors.grey2c,
                    zIndex: -2,
                    borderRadius: 12,
                  }}
                />
                <Image
                  source={{uri: props.currentMessage.image}}
                  resizeMode="stretch"
                  style={{width: 173, height: 85, borderRadius: 12}}
                />
              </View>
            </TouchableOpacity>
          )}
          renderBubble={props => {
            return (
              <ChatBubble
                {...(props as any)}
                onLongPress={onLongPress}
                onSelectMessage={onSelectMessage}
                onDeleteMessage={onDeleteMessage}
                selectedMessages={selectedMessages}
              />
            );
          }}
          user={{
            _id: userProfile?.email,
          }}
          renderInputToolbar={props => (
            <RenderInputToolBar {...(props as any)} />
          )}
          minInputToolbarHeight={IS_IPHONE_X ? 100 : 130}
        />
        <ImageView
          images={images}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      </SafeAreaView>
      {isOpened && (
        <ViewContainer style={styles.deleteContainer}>
          <View style={{width: '100%', justifyContent: 'center', height: 62}}>
            <TouchableOpacity
              onPress={onDeleteMessage}
              style={{...shadows.sh3, position: 'absolute', left: 15}}
            >
              <DeleteMessageIcon />
            </TouchableOpacity>
            <View style={{alignSelf: 'center', flexDirection: 'row'}}>
              <Typography
                text="[ "
                type="label"
                style={{fontSize: 12, lineHeight: 20}}
              />
              <Typography
                text="Delete "
                type="label"
                style={{fontSize: 12, lineHeight: 20}}
              />
              <Typography
                text={`${selectedMessages.length} message(s)`}
                type="h1"
                style={{fontSize: 12, lineHeight: 20}}
              />
              <Typography
                text=" ]"
                type="label"
                style={{fontSize: 12, lineHeight: 20}}
              />
            </View>
          </View>
        </ViewContainer>
      )}
    </ViewContainer>
  );
};

export default Chat;
