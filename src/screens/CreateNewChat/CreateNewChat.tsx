import React, {useEffect} from 'react';
import {Alert, FlatList} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import ChatListItem from 'components/ChatListItem/ChatListItem';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import Spacer from 'components/Spacer/Spacer';
import Typography from 'components/Typography/Typography';
import {Colors} from 'theme';
import localization from 'localization/localization';
import {getMessagesUsers} from 'store/actions/user.actions';
import {getMessagesUsersSelector} from 'store/reducers/profile.reducer';
import Input from 'components/Input/Input';
import styles from './styles';
import ROUTES from 'navigation/routes';
import {createNewChat} from 'store/actions/messages.actions';
import {setAppLoading} from 'store/actions/auth.actions';
import {ActionSuffix} from 'store/models';
import GreySearch from 'images/GreySearch';
import {MainFlowContainer} from 'components/MainFlowContainer';
import {
  getCurrentWorkspace,
  getMyWorkspaceSelector,
  getSubcontractorWorkspaceIdSelector,
} from 'store/reducers/workspace.reducer';
import {getAccountType} from 'store/reducers/auth.reducer';
import {typesOfAccount} from 'typings/types.common';

const CreateNewChat = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const messagesUser = useSelector(getMessagesUsersSelector);
  const myWorkspace = useSelector(getMyWorkspaceSelector);
  const currentWorkspace = useSelector(getCurrentWorkspace);
  const workspace_id = useSelector(getSubcontractorWorkspaceIdSelector);
  const accountType = useSelector(getAccountType);

  const workspaceId =
    accountType === typesOfAccount.subContractor
      ? workspace_id
      : myWorkspace?.id || currentWorkspace?.id;

  useEffect(() => {
    dispatch(getMessagesUsers(workspaceId));
    dispatch(setAppLoading(false));
  }, [dispatch, workspaceId]);

  const onCreateNewChat = async (chatItem: any) => {
    dispatch(setAppLoading(true));
    try {
      const request = await dispatch(createNewChat(chatItem.id, workspaceId));
      if (request.type.includes(ActionSuffix.SUCCESS)) {
        navigation.navigate(
          ROUTES.CHAT as never,
          {id: request?.payload?.data?.pk, chatItem, withBackPress: true} as never,
        );
      }
    } catch (e) {
      //setError(e?.response?.data?.email);
      //showRequestErrorMessage(e.response?.data?.email);
      dispatch(setAppLoading(false));
      Alert.alert(e as string);
    } finally {
      dispatch(setAppLoading(false));
    }
  };

  const renderItem = ({item}) => {
    return (
      <ChatListItem
        name={item.full_name}
        image={item.avatar}
        lastMessage={
          !!item.contractor
            ? typesOfAccount.contractor
            : typesOfAccount.subContractor
        }
        withDate={false}
        onPress={() => {
          onCreateNewChat(item);
        }}
      />
    );
  };

  const searchUsers = val => {
    dispatch(getMessagesUsers(workspaceId, val));
  };

  return (
    <MainFlowContainer
      withBackButton
      headerComponent={
        <ViewContainer style={styles.container}>
          <Spacer height={42} />
          <Typography text={localization.messages.newMessage} type="h2" />
          <Spacer height={15} />
          <Input
            bgColor={Colors.white}
            onChange={searchUsers}
            placeholder={'Tape a name'}
            placeholderTextColor={Colors.placeholderColor}
            containerStyle={{height: 44, paddingLeft: 52}}
            leftComponent={<GreySearch />}
            leftComponentStyle={{left: 20}}
          />
          <Spacer height={25} />
        </ViewContainer>
      }
    >
      <ViewContainer style={styles.chatListContainer}>
        <Typography
          text={localization.messages.suggested}
          type="h2"
          style={{paddingLeft: 16}}
        />
        <Spacer height={11} />
        <FlatList renderItem={renderItem} data={messagesUser as any} />
      </ViewContainer>
    </MainFlowContainer>
  );
};

export default CreateNewChat;
