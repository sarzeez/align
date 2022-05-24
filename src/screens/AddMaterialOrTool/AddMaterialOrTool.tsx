import {
  View,
  Text,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Header from 'components/Header/Header';
import Typography from 'components/Typography/Typography';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './style';

import ToolTab from './ToolTab';
import MaterialTab from './MaterialTab';
import {useDispatch, useSelector} from 'react-redux';
import {
  loadAssignee,
  loadRooms,
  loadToolTypes,
} from 'store/actions/material.tool.actions';
import {getSelectedProject} from 'store/reducers/project.reducer';
import {getCurrentWorkspace} from 'store/reducers/workspace.reducer';
import {getTools} from 'store/reducers/material.tool.reducer';

const AddMaterialOrTool = ({route}: any) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(route?.params?.index || 0);
  const dispatch = useDispatch();

  const [routes] = React.useState([
    {key: 'first', title: 'Tool'},
    {key: 'second', title: 'Material'},
    // {key: 'third', title: 'Tools'},
  ]);

  const renderTool = () => {
    return <ToolTab />;
  };

  const renderMaterial = () => {
    return <MaterialTab />;
  };

  const renderScene = SceneMap({
    first: () => (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
      >
        {renderTool()}
      </ScrollView>
    ),
    second: () => (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
      >
        {renderMaterial()}
      </ScrollView>
    ),
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabBarIndicator}
      style={styles.tabBar}
      renderLabel={({route}) => (
        <Text style={styles.tabBarText}>{route.title}</Text>
      )}
    />
  );

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={styles.safeArea}>
        <Header withBackButton />
        <View style={styles.addMaterialToolHeader}>
          <Typography
            fontType="Medium"
            type="h4"
            text="Add"
            style={{fontSize: 12}}
          />
          <Typography type="h3" text="Material or Tool" />
        </View>
        <TabView
          lazy
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          sceneContainerStyle={styles.sceneContainerStyle}
        />
      </SafeAreaView>
    </>
  );
};

export default AddMaterialOrTool;
