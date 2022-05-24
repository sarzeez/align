import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ROUTES from 'navigation/routes';
import Projects from 'screens/Projects/Projects';

const ProjectsStack = createNativeStackNavigator();

const ProjectsTab = () => (
  <ProjectsStack.Navigator
    initialRouteName={ROUTES.PROJECTS}
    screenOptions={{
      headerShown: false,
    }}
  >
    <ProjectsStack.Screen name={ROUTES.PROJECTS} component={Projects} />
  </ProjectsStack.Navigator>
);

export default ProjectsTab;
