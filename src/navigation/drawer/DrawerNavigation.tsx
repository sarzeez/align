import React from 'react';
import {View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import TabNavigator from 'navigation/TabNavigator';
import ROUTES from 'navigation/routes';
import DrawerList from './DrawerItem/DrawerItem';
import NewLogo from 'images/NewLogo';
import {Colors} from 'theme';
import HomeIcon from 'images/HomeIcon';
import LogoutIcon from 'images/LogoutIcon';
import SubscriptionsIcon from 'images/SubscriptionsIcon';
import ArchiveIcon from 'images/ArchiveIcon';
import {hardLogout, logout, setAppLoading} from 'store/actions/auth.actions';
import {ActionSuffix} from 'store/models';
import {getRefreshToken, getToken} from 'store/reducers/auth.reducer';
import Archive from 'screens/Archive/Archive';
import ProjectsIcon from 'images/ProjectsIcon';
import SettingsIcon from 'images/SettingsIcon';
import SettingsNavigator from 'navigation/SettingsNavigator';
import {getProfile} from 'store/reducers/profile.reducer';
import WorkspaceIcon from 'images/WorkspaceIcon';
import Spacer from 'components/Spacer/Spacer';
import {WorkspaceSubcontractor} from 'screens/WorkspaceSubcontractor/WorkspaceSubcontractor';
import configureStore from 'store/storeConfiguration';
const {store, persistor} = configureStore({}, null);

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const dispatch = useDispatch();
  const access = useSelector(getToken);
  const refresh = useSelector(getRefreshToken);
  const profile = useSelector(getProfile);
  const isContractor = profile?.contractor;
  const isSubContractor = profile?.subcontractor;

  const onLogout = async () => {
    console.log('log out');
    dispatch(setAppLoading(true));
    try {
      const request = await dispatch(logout({access, refresh}));
      if (request.type.includes(ActionSuffix.SUCCESS)) {
        dispatch(hardLogout());
        // persistor.purge();
      } else {
        //showRequestErrorMessage(request.error.response?.data?.detail);
      }
    } catch (e) {
      //showRequestErrorMessage(e.response?.data?.email);
    } finally {
      dispatch(setAppLoading(false));
    }
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {paddingTop: 70, width: '80%'},
        // drawerHideStatusBarOnOpen: true,
      }}
      drawerContent={props => {
        return (
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={{
              paddingTop: 20,
              paddingRight: 0,
              flex: 1,
              justifyContent: 'space-between',
            }}
            style={{paddingBottom: 35, paddingRight: 0, paddingLeft: 20}}
            scrollEnabled={false}
          >
            <View>
              <View style={{marginLeft: 15}}>
                <NewLogo />
              </View>
              <Spacer height={40} />
              <DrawerList
                {...props}
                activeBackgroundColor={Colors.transparent}
                inActiveBackgroundColor={Colors.transparent}
                labelStyle={{
                  fontFamily: 'Inter-Bold',
                  color: Colors.black2,
                  fontSize: 16,
                  paddingLeft: 0,
                  position: 'absolute',
                  bottom: -10,
                  left: -13,
                }}
                itemStyle={{
                  borderBottomWidth: 1,
                  borderColor: Colors.dividerColor,
                  borderRadius: 0,
                  marginRight: 0,
                  paddingRight: 0,
                  marginLeft: 0,
                }}
                containerStyle={{backgroundColor: 'red'}}
                activeTintColor={Colors.orange}
                inactiveTintColor={Colors.black}
              />
            </View>
          </DrawerContentScrollView>
        );
      }}
      initialRouteName={ROUTES.HOME}
    >
      <Drawer.Screen
        name={ROUTES.HOME}
        component={TabNavigator}
        options={{drawerIcon: HomeIcon}}
      />
      <Drawer.Screen
        name={ROUTES.PROJECTS}
        component={TabNavigator}
        options={{drawerIcon: ProjectsIcon}}
      />
      <Drawer.Screen
        name={ROUTES.ARCHIVE}
        component={Archive}
        options={{drawerIcon: ArchiveIcon}}
      />

      {isContractor && (
        <Drawer.Screen
          name={ROUTES.SUBSCRIPTIONS}
          component={TabNavigator}
          options={{drawerIcon: SubscriptionsIcon}}
        />
      )}
      {isSubContractor && (
        <Drawer.Screen
          name={ROUTES.WORKSPACES}
          component={WorkspaceSubcontractor}
          options={{drawerIcon: WorkspaceIcon}}
        />
      )}
      <Drawer.Screen
        name={ROUTES.LOGOUT}
        component={Archive}
        options={{
          onPress: () => {
            onLogout();
          },
          drawerIcon: LogoutIcon,
        }}
      />

      <Drawer.Screen
        name={ROUTES.SETTINGS}
        component={SettingsNavigator}
        options={{drawerIcon: SettingsIcon}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
