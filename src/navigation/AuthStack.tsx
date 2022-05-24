import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InitialScreen from 'screens/InitialScreen/InitialScreen';
import SignIn from 'screens/SignIn/SignIn';
import GetStarted from 'screens/GetStarted/GetStarted';
import CreateAccount from 'screens/CreateAccount/CreateAccount';
import ForgotPassword from 'screens/ForgotPassword/ForgotPassword';
import ForgotPasswordSecondStep from 'screens/ForgotPasswordSecondStep/ForgotPasswordSecondStep';
import {TermsScreen} from 'screens/TermsScreen';
import CreateWorkSpace from '../screens/CreateWorkSpace/CreateWorkSpace';
import JoinWorkSpace from '../screens/JoinWorkspace/JoinWorkSpace';
import StartProject from '../screens/StartProject/StartProject';
import AddRoom from '../screens/AddRoom/AddRoom';
import CameraScreen from 'screens/Camera/Camera';

import ROUTES from './routes';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName={ROUTES.INITIAL_SCREEN}
  >
    <AuthStack.Screen name={ROUTES.INITIAL_SCREEN} component={InitialScreen} />
    <AuthStack.Screen name={ROUTES.SIGN_IN} component={SignIn} />
    <AuthStack.Screen name={ROUTES.GET_STARTED} component={GetStarted} />
    <AuthStack.Screen name={ROUTES.CREATE_ACCOUNT} component={CreateAccount} />
    <AuthStack.Screen
      name={ROUTES.FORGOT_PASSWORD}
      component={ForgotPassword}
    />
    <AuthStack.Screen
      name={ROUTES.FORGOT_PASSWORD_SECOND_STEP}
      component={ForgotPasswordSecondStep}
    />
    <AuthStack.Screen name={ROUTES.TERMS_SCREEN} component={TermsScreen} />
    <AuthStack.Screen
      name={ROUTES.CREATE_A_WORKSPACE}
      component={CreateWorkSpace}
    />
    <AuthStack.Screen
      name={ROUTES.JOIN_A_WORKSPACE}
      component={JoinWorkSpace}
    />
    <AuthStack.Screen
      name={ROUTES.START_PROJECT}
      component={StartProject}
      initialParams={{withSkip: true}}
    />
    <AuthStack.Screen
      name={ROUTES.ADD_ROOM}
      component={AddRoom}
      initialParams={{withSkip: true}}
    />

    <AuthStack.Screen
      name={ROUTES.CAMERA}
      component={CameraScreen}
      initialParams={{withSkip: true}}
    />
  </AuthStack.Navigator>
);

export default AuthNavigation;
