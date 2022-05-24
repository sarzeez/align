import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';
import BottomTabs from 'components/BottomTabs/BottomTabs';
import Home from 'screens/Home/Home';
import TodaysBriefItem from 'screens/TodaysBriefItem/TodaysBriefItem';
import Subscriptions from 'screens/Subscriptions/Subscriptions';
import Projects from 'screens/Projects/Projects';
import Messages from 'screens/Messages/Messages';
import CreateNewChat from 'screens/CreateNewChat/CreateNewChat';
import Camera from 'screens/Camera/Camera';
import {WorkspaceSettings} from 'screens/WorkspaceSettings';
import {WorkspaceSubcontractor} from 'screens/WorkspaceSubcontractor';
import CreateWorkSpace from 'screens/CreateWorkSpace/CreateWorkSpace';
import JoinWorkSpace from 'screens/JoinWorkspace/JoinWorkSpace';
import StartProject from 'screens/StartProject/StartProject';
import AddRoom from 'screens/AddRoom/AddRoom';
import TodaysBrief from 'screens/TodaysBrief/TodaysBrief';
import {ImageViewerScreen} from 'screens/ImageViewerScreen';
import {getMyProfile} from 'store/actions/auth.actions';
import Project from 'screens/Project/Project';
import Chat from 'screens/Chat/Chat';

import {getProfile} from 'store/reducers/profile.reducer';
import {WorkspaceDetails} from 'screens/WorkspaceDetails/WorkspaceDetails';
import Room from 'screens/Room/Room';
import AddPunchListItem from 'screens/AddPunchListItem/AddPunchListItem';
import AddMaterialOrTool from 'screens/AddMaterialOrTool/AddMaterialOrTool';
import ROUTES from './routes';
import SingleTaskView from 'screens/SingleTaskView/SingleTaskView';
import EditAddMaterialOrTool from 'screens/AddMaterialOrToolEdit/EditAddMaterialOrTool';
import SingleToolMaterialView from 'screens/SingleToolMaterialView/SingleToolMaterialView';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabStack = () => {
  const userProfile = useSelector(getProfile);
  const isContractor = userProfile?.contractor;
  const isSubContractor = userProfile?.subcontractor;
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={{headerShown: false}}
      tabBar={props => <BottomTabs {...props} />}
    >
      <Tab.Screen name={ROUTES.HOME} component={Home} />
      {isContractor && (
        <Tab.Screen name={ROUTES.SUBSCRIPTIONS} component={Subscriptions} />
      )}
      {isSubContractor && (
        <Tab.Screen
          name={ROUTES.WORKSPACES}
          component={WorkspaceSubcontractor}
        />
      )}
      <Tab.Screen name={ROUTES.PROJECTS} component={Projects} />
      <Tab.Screen name={ROUTES.MESSAGES} component={Messages} />
    </Tab.Navigator>
  );
};

const TabNavigator = () => {
  const dispatch = useDispatch();
  // ComponentDidMount
  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.TAB_BAR} component={TabStack} />
      <Stack.Screen name={ROUTES.CREAT_NEW_CHAT} component={CreateNewChat} />
      <Stack.Screen
        name={ROUTES.WORKSPACE_SETTINGS}
        component={WorkspaceSettings}
      />
      <Stack.Screen
        name={ROUTES.WORKSPACE_SUBCONTRACTOR}
        component={WorkspaceSubcontractor}
      />
      <Stack.Screen name={ROUTES.TAB_NAVIGATOR} component={TabNavigator} />
      <Stack.Screen
        name={ROUTES.CREATE_A_WORKSPACE}
        component={CreateWorkSpace}
      />
      <Stack.Screen
        name={ROUTES.WORKSPACE_DETAILS}
        component={WorkspaceDetails}
      />
      <Stack.Screen name={ROUTES.JOIN_A_WORKSPACE} component={JoinWorkSpace} />
      <Stack.Screen
        name={ROUTES.START_PROJECT}
        component={StartProject}
        initialParams={{withBackButton: true}}
      />
      <Stack.Screen name={ROUTES.PROJECT} component={Project} />
      <Stack.Screen name={ROUTES.ADD_ROOM} component={AddRoom} />
      <Stack.Screen name={ROUTES.ROOM} component={Room} />
      <Stack.Screen
        name={ROUTES.IMAGE_VIEWER_SCREEN}
        component={ImageViewerScreen}
      />
      <Stack.Screen name={ROUTES.CAMERA} component={Camera} />
      <Stack.Screen name={ROUTES.CHAT} component={Chat} />
      <Stack.Screen name={ROUTES.TODAYS_BRIEF} component={TodaysBrief} />
      <Stack.Screen
        name={ROUTES.TODAYS_BRIEF_ITEM}
        component={TodaysBriefItem}
      />
      <Stack.Screen name={ROUTES.SINGLE_TASK_VIEW} component={SingleTaskView} />
      <Stack.Screen
        name={ROUTES.ADD_PUNCHLIST_ITEM}
        component={AddPunchListItem}
      />
      <Stack.Screen
        name={ROUTES.ADD_MATERIAL_OR_TOOL}
        component={AddMaterialOrTool}
      />
      <Stack.Screen
        name={ROUTES.EDIT_ADD_MATERIAL_OR_TOOL}
        component={EditAddMaterialOrTool}
      />

      <Stack.Screen
        name={ROUTES.SINGLE_MATERIAL_TOOL_VIEW}
        component={SingleToolMaterialView}
      />
    </Stack.Navigator>
  );
};

export default TabNavigator;
