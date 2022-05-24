import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {navigationRef} from './navigation.service';
import AuthStack from './AuthStack';
import DrawerNavigation from './drawer/DrawerNavigation';
import {getToken} from 'store/reducers/auth.reducer';

const AppRoutes = () => {
  const token = useSelector(getToken);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={token ? 'light-content' : 'dark-content'} />
      {!!token ? <DrawerNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppRoutes;
