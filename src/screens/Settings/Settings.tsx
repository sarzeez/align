import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import ViewContainer from 'components/ViewContainer/ViewContainer';
import WithBackgroundImageWrapper from 'components/WithBackgroundImageWrapper/WithBackgroundImageWrapper';
import IconNameArrowComponent from 'components/IconNameArrowComponent/IconNameArrowComponent';
import MyWorkspaceIcon from 'images/MyWorkspaceIcon';
import MyAccountIcon from 'images/MyAccountIcon';
import ChangePasswordIcon from 'images/ChangePasswordIcon';
import SettingsHeader from 'components/Header/SettingsHeader';
import localization from 'localization/localization';
import styles from './styles';
import Spacer from 'components/Spacer/Spacer';
import ROUTES from 'navigation/routes';
import {getProfile} from 'store/reducers/profile.reducer';

const Settings = () => {
  const navigation = useNavigation();
  const profile = useSelector(getProfile);
  return (
    <WithBackgroundImageWrapper>
      <SettingsHeader heading={localization.settings.heading} />
      <ViewContainer flex={1} style={styles.container}>
        <Spacer height={28.5} />
        {!!profile?.contractor && (
          <>
            <IconNameArrowComponent
              image={<MyWorkspaceIcon />}
              name={localization.settings.myWorkspace}
              onPress={() => navigation.navigate(ROUTES.MY_WORKSPACE as never)}
            />
            <Spacer height={9} />
          </>
        )}
        <IconNameArrowComponent
          image={<ChangePasswordIcon />}
          name={localization.settings.changePassword}
          onPress={() => navigation.navigate(ROUTES.CHANGE_PASSWORD as never)}
        />
        <Spacer height={9} />
        <IconNameArrowComponent
          image={<MyAccountIcon />}
          name={localization.settings.myAccount}
          onPress={() => navigation.navigate(ROUTES.MY_ACCOUNT as never)}
        />
      </ViewContainer>
    </WithBackgroundImageWrapper>
  );
};

export default Settings;
