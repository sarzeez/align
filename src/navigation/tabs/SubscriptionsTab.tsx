import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ROUTES from 'navigation/routes';
import Subscriptions from 'screens/Subscriptions/Subscriptions';

const SubscriptionsStack = createNativeStackNavigator();

const SubscriptionsTab = () => (
  <SubscriptionsStack.Navigator
    initialRouteName={ROUTES.SUBSCRIPTIONS}
    screenOptions={{
      headerShown: false,
    }}
  >
    <SubscriptionsStack.Screen
      name={ROUTES.SUBSCRIPTIONS}
      component={Subscriptions}
    />
  </SubscriptionsStack.Navigator>
);

export default SubscriptionsTab;
