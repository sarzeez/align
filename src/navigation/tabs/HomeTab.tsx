import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ROUTES from 'navigation/routes';
import Home from 'screens/Home/Home';

const HomeStack = createNativeStackNavigator();

const HomeTab = () => (
  <HomeStack.Navigator
    initialRouteName={ROUTES.HOME}
    screenOptions={{
      headerShown: false,
    }}
  >
    <HomeStack.Screen name={ROUTES.HOME} component={Home} />
  </HomeStack.Navigator>
);

export default HomeTab;
