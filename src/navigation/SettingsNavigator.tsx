import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ROUTES from './routes';
import ChangePassword from 'screens/ChangePassword/ChangePassword';
import Settings from 'screens/Settings/Settings';
import MyWorkspace from 'screens/MyWorkspace/MyWorkspace';
import MyAccount from 'screens/MyAccount/MyAccount';
import EditMyAccount from 'screens/EditMyAccount/EditMyAccount';
import InviteMember from 'screens/InviteMember/InviteMember';
const Stack = createNativeStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.SETTINGS_NAV} component={Settings} />
      <Stack.Screen name={ROUTES.CHANGE_PASSWORD} component={ChangePassword} />
      <Stack.Screen name={ROUTES.MY_WORKSPACE} component={MyWorkspace} />
      <Stack.Screen name={ROUTES.MY_ACCOUNT} component={MyAccount} />
      <Stack.Screen name={ROUTES.EDIT_MY_ACCOUNT} component={EditMyAccount} />
      <Stack.Screen name={ROUTES.INVITE_MEMBER} component={InviteMember} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
