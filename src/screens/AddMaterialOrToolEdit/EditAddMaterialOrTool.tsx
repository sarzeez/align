import {
  View,
  Text,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Header from 'components/Header/Header';
import Typography from 'components/Typography/Typography';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './style';

import ToolTab from './EditToolTab';
import MaterialTab from './EditMaterialTab';

const EditAddMaterialOrTool = ({route}: any) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(route?.params?.index || 0);

  const [routes] = React.useState([
    {key: 'first', title: 'Tool'},
    {key: 'second', title: 'Material'},
    // {key: 'third', title: 'Tools'},
  ]);

  const renderTool = () => {
    return <ToolTab {...route} />;
  };

  const renderMaterial = () => {
    return <MaterialTab {...route} />;
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
            text="Edit"
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

export default EditAddMaterialOrTool;
