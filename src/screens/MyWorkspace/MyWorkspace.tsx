import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import SettingsHeader from 'components/Header/SettingsHeader';
import ViewContainer from 'components/ViewContainer/ViewContainer';
// import Divider from 'components/Divider/Divider';
import styles from './styles';
import localization from 'localization/localization';
// import {getUser} from 'store/actions/user.actions';
import {getWorkspace, revokeSubcontractor} from 'store/actions/workspace.actions';
import Spacer from 'components/Spacer/Spacer';
import {Colors} from 'theme';
import Typography from 'components/Typography/Typography';
import ROUTES from 'navigation/routes';
// import BlackBackground from 'images/BlackBackground';
import Input from 'components/Input/Input';
import {
  // getWorkspaceSelector,
  getMyWorkspaceSelector,
} from 'store/reducers/workspace.reducer';
import WithBackgroundImageWrapper from 'components/WithBackgroundImageWrapper/WithBackgroundImageWrapper';
import Button from 'components/Button/Button';
import WorkspaceParticipantsItem from 'components/WorkspaceParticipantsItem/WorkspaceParticipantsItem';
import LinkButton from 'components/LinkButton/LinkButton';
import EventsModal from '../../components/EventsModal/EventsModal';

const MyWorkspace = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const myWorkspace = useSelector(getMyWorkspaceSelector);

  const availableSeats = myWorkspace?.seats - myWorkspace?.members?.length;

  const [seats, setSeats] = useState<string | undefined | number>(
    myWorkspace?.seats,
  );
  const [pin, setPin] = useState<string | undefined | number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [itemId, setItemId] = useState<number | null>(null);
  const [itemEmail, setItemEmail] = useState<string | null>('');
  const handleWithWorkspaces = useCallback(() => {
    dispatch(getWorkspace());
  }, [dispatch]);

  useEffect(() => {
    handleWithWorkspaces();
  }, [handleWithWorkspaces]);

  useEffect(() => {
    setPin(myWorkspace?.pin);
    setSeats(myWorkspace?.seats);
  }, [myWorkspace?.pin, myWorkspace?.seats]);

  const onChangeSeats = (value: string) => {
    setSeats(value);
  };

  const onChangePin = (value: string) => {
    setPin(value);
  };

  const handleDelete = (id: number, email: string) => {
    setItemId(id);
    setItemEmail(email);
    setVisible(true);
  };

  const onCloseModal = () => {
    setVisible(false);
  };

  const onRevokeItem = async () => {
    await dispatch(revokeSubcontractor({id: itemId, email: itemEmail}));
    await dispatch(getWorkspace());
    onCloseModal();
  };

  const onInvite = () => {
    navigation.navigate(ROUTES.INVITE_MEMBER as never);
  };

  const renderMembers = () => {
    return (
      !!myWorkspace?.members &&
      !!myWorkspace?.members?.length &&
      myWorkspace?.members.map(item => (
        <WorkspaceParticipantsItem
          key={item.id}
          image={item.avatar}
          name={item.full_name}
          email={item.email}
          onPress={() => handleDelete(myWorkspace.id, item.email)}
        />
      ))
    );
  };

  return (
    <WithBackgroundImageWrapper>
      <SettingsHeader heading={localization.myWorkspace.heading} />
      <ScrollView
        style={styles.wrapper}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Input
          bgColor={Colors.white}
          editable={false}
          label={localization.myWorkspace.pin}
          placeholder={localization.myWorkspace.pin}
          onChange={onChangePin}
          value={`${pin}`}
          withShadow
        />
        <Spacer height={19} />
        <View style={styles.inputContainer}>
          <Input
            bgColor={Colors.white}
            editable={false}
            containerStyle={styles.seatsContainer}
            label={localization.myWorkspace.seats}
            placeholder={localization.myWorkspace.seats}
            onChange={onChangeSeats}
            value={`${seats}`}
            withShadow
          />

          <View style={styles.seatsCount}>
            <Typography text="Note:" type="label" fontColor={Colors.orange} />
            <Typography
              type="label"
              text={`You have ${availableSeats} free seats available`}
            />
          </View>
        </View>
        <Spacer height={44} />
        <ViewContainer alignItems="center">{renderMembers()}</ViewContainer>
        <Spacer height={44} />
        <Button
          style={styles.button}
          btnText="Invite New Member"
          onPress={() => onInvite()}
        />
        <Spacer height={44} />
        <ViewContainer justifyContent="center" alignItems="center">
          <LinkButton
            text="Add More Seats"
            onPress={() => {
              console.log('hello');
            }}
          />
        </ViewContainer>
      </ScrollView>
      <EventsModal
        withTwoButtons
        isShow={visible}
        onCloseModal={onCloseModal}
        onFirstButtonPress={onRevokeItem}
        onSecondButtonPress={onCloseModal}
        title={localization.myWorkspace.modalHeader}
        underTitle={localization.myWorkspace.modalTitle}
        firstButtonTitle={localization.myWorkspace.modalFirstButtonTitle}
        secondButtonTitle={localization.myWorkspace.modalSecondButtonTitle}
      />
    </WithBackgroundImageWrapper>
  );
};

export default MyWorkspace;
