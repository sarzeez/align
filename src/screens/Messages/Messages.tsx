import React, {useCallback, useState} from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import ChatListItem from 'components/ChatListItem/ChatListItem';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import DeleteIcon from 'images/DeleteIcon';
import Spacer from 'components/Spacer/Spacer';
import Typography from 'components/Typography/Typography';
import {Colors} from 'theme';
import localization from 'localization/localization';
import {
  deleteChat,
  getChatRooms,
  searchChats,
} from 'store/actions/messages.actions';
import Input from 'components/Input/Input';
import {getMessagesRoomSelector} from 'store/reducers/messages.reducer';
import styles from './styles';
import EmptyMessages from 'components/EmptyMessages/EmptyMessages';
import ROUTES from 'navigation/routes';
import {MainFlowContainer} from 'components/MainFlowContainer';
import GreySearch from 'images/GreySearch';
import {typesOfAccount} from 'typings/types.common';
import {
  getCurrentWorkspace,
  getMyWorkspaceSelector,
  getSubcontractorWorkspaceIdSelector,
} from 'store/reducers/workspace.reducer';
import {getAccountType} from 'store/reducers/auth.reducer';
import {setAppLoading} from 'store/actions/auth.actions';
import {showRequestErrorMessage} from 'helpers/functions';
import DrawerToggleButton from 'components/DrawerToggleButton/DrawerToggleButton';
import AvatarPlaceHolder from 'images/AvatarPlaceholder49';
import {getProfile} from 'store/reducers/profile.reducer';
import NewMessageIcon from 'images/NewMessageIcon';
import {DEVICE_HEIGHT, IS_IPHONE_X} from 'helpers/constants';

const listViewHeight =
  DEVICE_HEIGHT -
  52 -
  42 -
  32.5 -
  15 -
  44 -
  25 -
  34 -
  90 -
  (IS_IPHONE_X ? 70 : 30);

const Messages = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const messagesRoom = useSelector(getMessagesRoomSelector);
  const myWorkspace = useSelector(getMyWorkspaceSelector);
  const currentWorkspace = useSelector(getCurrentWorkspace);
  const workspace_id = useSelector(getSubcontractorWorkspaceIdSelector);
  const accountType = useSelector(getAccountType);
  const profile = useSelector(getProfile);
  const [searchValue, setSearchValue] = useState<string>('');
  const messagesRoomsIsNotEmpty = messagesRoom && messagesRoom.length;

  const workspaceId =
    accountType === typesOfAccount.subContractor
      ? workspace_id
      : myWorkspace?.id || currentWorkspace?.id;

  useFocusEffect(
    useCallback(() => {
      isFocused && dispatch(getChatRooms(workspaceId));
    }, [isFocused, workspaceId, dispatch]),
  );

  const goToCreateNewChat = () => {
    navigation.navigate(ROUTES.CREAT_NEW_CHAT as never);
  };

  const goToChat = (item: any) => {
    navigation.navigate(ROUTES.CHAT as never, {chatItem: item} as never);
  };

  const onDeleteChat = (id: number) => {
    dispatch(setAppLoading(true));
    Promise.all([dispatch(deleteChat(id))])
      .then(([resp]) => {
        dispatch(getChatRooms(workspaceId));
      })
      .catch(error => {
        showRequestErrorMessage(JSON.stringify(error));
      })
      .finally(() => {
        dispatch(setAppLoading(false));
      });
    return;
  };

  const onSearch = (val: string) => {
    setSearchValue(val);
    if (val.trim()) {
      dispatch(searchChats({search: val, workspaceId}));
    } else {
      dispatch(getChatRooms(workspaceId));
    }
  };

  return (
    <MainFlowContainer
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled"
      headerComponent={
        <ViewContainer style={styles.container}>
          <Spacer height={42} />
          <Typography text={localization.messages.title} type="h2" />
          <Spacer height={15} />
          <Input
            bgColor={Colors.white}
            onChange={onSearch}
            placeholder={'Search'}
            placeholderTextColor={Colors.placeholderColor}
            containerStyle={{height: 44, paddingLeft: 52}}
            leftComponent={<GreySearch />}
            leftComponentStyle={{left: 20}}
          />
          <Spacer height={25} />
        </ViewContainer>
      }
      leftComponent={<DrawerToggleButton />}
      rightComponent={
        profile?.avatar ? (
          <Image
            source={{uri: profile?.avatar}}
            style={{height: 49, width: 49, borderRadius: 14}}
          />
        ) : (
          <AvatarPlaceHolder />
        )
      }
      rightContainerStyle={{right: 16}}
    >
      <ViewContainer>
        <ViewContainer style={styles.chatListContainer}>
          {!messagesRoomsIsNotEmpty && !searchValue ? (
            <EmptyMessages onPress={goToCreateNewChat} />
          ) : (
            <SwipeListView
              style={{height: listViewHeight}}
              keyExtractor={(item, index) => item?.pk}
              disableRightSwipe
              data={messagesRoom}
              rightOpenValue={-72}
              renderItem={({item}: {item: any}) => (
                <ChatListItem
                  image={item?.avatar}
                  isActive={item?.is_online}
                  name={item?.name ? item?.name : item.sender_name}
                  lastMessage={
                    item?.last_message_text ||
                    item.last_message_file ||
                    item?.message
                  }
                  date={item?.last_message_date}
                  onPress={() => goToChat(item)}
                />
              )}
              renderHiddenItem={({item}, rowMap) => {
                return (
                  <ViewContainer alignItems="flex-end" width="100%" height={72}>
                    <TouchableOpacity
                      onPress={() => {
                        onDeleteChat(item?.pk);
                        rowMap[item?.pk].closeRow();
                      }}
                      style={styles.deleteButtonStyle}
                    >
                      <DeleteIcon color={Colors.white} />
                    </TouchableOpacity>
                  </ViewContainer>
                );
              }}
            />
          )}
        </ViewContainer>
      </ViewContainer>
      {!!messagesRoomsIsNotEmpty && (
        <TouchableOpacity
          onPress={goToCreateNewChat}
          style={styles.createNewChatButton}
        >
          <NewMessageIcon />
        </TouchableOpacity>
      )}
    </MainFlowContainer>
  );
};

export default Messages;
