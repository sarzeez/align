import React, {useCallback} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

import SettingsHeader from 'components/Header/SettingsHeader';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import AvatarPlaceHolder from 'images/AvatarPlaceholder';
import styles from './styles';
import localization from 'localization/localization';
import {getUser} from 'store/actions/user.actions';
import {getProfile} from 'store/reducers/profile.reducer';
import Spacer from 'components/Spacer/Spacer';
import Typography from 'components/Typography/Typography';
import MyAccountItem from 'components/MyAccountItem/MyAccountItem';
import NameOfUserIcon from 'images/NameOfUserIcon';
import AccountMailIcon from 'images/AccountMailIcon';
import ROUTES from 'navigation/routes';
import EditAccountIcon from 'images/EditAccountIcon';
import WithBackgroundImageWrapper from 'components/WithBackgroundImageWrapper/WithBackgroundImageWrapper';
// import IphoneIcon from 'images/IphoneIcon';

const MyAccount = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const userProfile = useSelector(getProfile);
  const navigation = useNavigation();

  // const isSubcontractor = userProfile?.subcontractor;
  const isContractor = userProfile?.contractor;

  useFocusEffect(
    useCallback(() => {
      isFocused && dispatch(getUser());
    }, [isFocused]),
  );

  const takePicture = () => {
    navigation.navigate(ROUTES.EDIT_MY_ACCOUNT as never);
  };

  return (
    <WithBackgroundImageWrapper>
      <SettingsHeader heading={localization.myAccount.heading} />
      <ViewContainer style={styles.wrapper}>
        <Spacer height={20} />
        <ViewContainer alignItems="flex-end" width={'100%'}>
          <TouchableOpacity onPress={takePicture} style={styles.takePicture}>
            <EditAccountIcon />
          </TouchableOpacity>
        </ViewContainer>
        <ViewContainer width="100%" alignItems="center">
          {userProfile?.avatar ? (
            <Image
              source={{uri: userProfile?.avatar}}
              style={{width: 112, height: 112, borderRadius: 14}}
            />
          ) : (
            <AvatarPlaceHolder />
          )}
        </ViewContainer>
        <Spacer height={14} />
        <Typography
          text={userProfile?.full_name}
          textCenter
          type="h2"
          numberOfLines={2}
          style={styles.userName}
        />
        <Spacer height={60} />
        {isContractor && (
          <>
            <MyAccountItem
              icon={<NameOfUserIcon />}
              text={userProfile?.contractor?.company}
            />
            <Spacer height={14} />
          </>
        )}

        <MyAccountItem icon={<AccountMailIcon />} text={userProfile?.email} />
        <Spacer height={14} />
        {/* {isSubcontractor && (
          <MyAccountItem icon={<IphoneIcon />} text={userProfile?.phone} />
        )} */}
      </ViewContainer>
    </WithBackgroundImageWrapper>
  );
};

export default MyAccount;
