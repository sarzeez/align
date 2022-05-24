import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ROUTES from 'navigation/routes';
import Messages from 'screens/Messages/Messages';

const MessagesStack = createNativeStackNavigator();

const MessagesTab = () => (
  <MessagesStack.Navigator
    initialRouteName={ROUTES.MESSAGES}
    screenOptions={{
      headerShown: false,
    }}
  >
    <MessagesStack.Screen name={ROUTES.MESSAGES} component={Messages} />
  </MessagesStack.Navigator>
);

export default MessagesTab;
