import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import SimpleGradientProgressbarView from 'react-native-simple-gradient-progressbar-view';
import {useDispatch, useSelector} from 'react-redux';
import localization from 'localization/localization';

import {getProjects} from 'store/actions/projects.actions';
import {
  getIsLoadingProjectsSelector,
  getProjectsSelector,
} from 'store/reducers/project.reducer';

import {FilterButton} from 'components/FilterButton/HeaderButton';
import Header from 'components/Header/Header';
import {useActionSheet} from 'components/ActionSheet/ActionSheetProvider';
import Placeholder from 'components/Placeholder/Placeholder';
import Typography from 'components/Typography/Typography';

import {AccordionView} from './Accordion';
import {styles} from './styles';
import {getCurrentWorkspace} from 'store/reducers/workspace.reducer';

import {
  getCurrentProgress,
  getIsLoadingMaterialsProjects,
  getIsLoadingTodoProjects,
  getIsLoadingToolsProjects,
  getMaterialsProjects,
  getTodoProjects,
  getToolsProjects,
} from 'store/reducers/briefs.reducer';
import {
  loadTodoProjects,
  loadMaterialsProjects,
  loadToolsProjects,
  loadTodoTasksByRoomID,
} from 'store/actions/briefs.actions';
import {AccordionViewTools} from './AccordionTools';
import {AccordionViewMaterials} from './AccordionMaterials';
import {useFocusEffect} from '@react-navigation/native';

const TodaysBrief = ({route}: any) => {
  const layout = useWindowDimensions();
  const {setActions, setTitle} = useActionSheet();
  const progressValue = 0.41;
  const dispatch = useDispatch();
  const myWorkspace = useSelector(getCurrentWorkspace);
  const progress = useSelector(getCurrentProgress);

  // todo
  const todoProjects = useSelector(getTodoProjects);
  const isLoadingTodoProject = useSelector(getIsLoadingTodoProjects);

  // materials
  const materialProjects = useSelector(getMaterialsProjects);
  const isLoadingMaterialsProjects = useSelector(getIsLoadingMaterialsProjects);

  // tools
  const toolsProjects = useSelector(getToolsProjects);
  const isLoadingToolsProjects = useSelector(getIsLoadingMaterialsProjects);

  const [index, setIndex] = React.useState(route.params.index);
  const [routes] = React.useState([
    {key: 'first', title: 'To-Do'},
    {key: 'second', title: 'Materials'},
    {key: 'third', title: 'Tools'},
  ]);

  // useEffect(() => {
  //   dispatch(loadTodoProjects(myWorkspace?.id));
  //   Promise.resolve(dispatch(loadMaterialsProjects(myWorkspace?.id))).then(() =>
  //     dispatch(loadToolsProjects(myWorkspace?.id)),
  //   );
  // }, [dispatch, index]);

  // useEffect(() => {
  //   todoProjects?.map(project =>
  //     project?.rooms?.map(room => {
  //       dispatch(loadTodoTasksByRoomID(myWorkspace?.id, room.id));
  //     }),
  //   );
  // }, [index]);

  useFocusEffect(
    useCallback(() => {
      dispatch(loadTodoProjects(myWorkspace?.id));
      Promise.resolve(dispatch(loadMaterialsProjects(myWorkspace?.id))).then(
        () => dispatch(loadToolsProjects(myWorkspace?.id)),
      );
    }, [dispatch]),
  );

  useFocusEffect(
    useCallback(() => {
      todoProjects?.map(project =>
        project?.rooms?.map(room => {
          dispatch(loadTodoTasksByRoomID(myWorkspace?.id, room.id));
        }),
      );
    }, [dispatch]),
  );

  const renderProjects = () => {
    if (isLoadingTodoProject) {
      return (
        <View style={styles.loadingHolder}>
          <ActivityIndicator />
        </View>
      );
    }

    if (!todoProjects.length) {
      return (
        <Placeholder
          title={localization.projects.placeholder.title}
          text={localization.projects.placeholder.text}
          titleSize={34}
          textSize={18}
        />
      );
    }
    return (
      <AccordionView
        projects={todoProjects}
        onChangeTrade={() => {
          setTitle('Change trade');
          setActions(ACTIONS);
        }}
        select={false}
      />
    );
  };

  const renderMaterials = () => {
    if (isLoadingMaterialsProjects) {
      return (
        <View style={styles.loadingHolder}>
          <ActivityIndicator />
        </View>
      );
    }

    if (!materialProjects.length) {
      return (
        <Placeholder
          title={localization.projects.placeholder.title}
          text={localization.projects.placeholder.text}
          titleSize={34}
          textSize={18}
        />
      );
    }
    return (
      <AccordionViewMaterials
        projects={materialProjects}
        onChangeTrade={() => {
          setTitle('Change trade');
          setActions(ACTIONS);
        }}
        select={false}
      />
    );
  };

  const renderTools = () => {
    if (isLoadingToolsProjects) {
      return (
        <View style={styles.loadingHolder}>
          <ActivityIndicator />
        </View>
      );
    }

    if (!toolsProjects.length) {
      return (
        <Placeholder
          title={localization.projects.placeholder.title}
          text={localization.projects.placeholder.text}
          titleSize={34}
          textSize={18}
        />
      );
    }
    return (
      <AccordionViewTools
        projects={toolsProjects}
        onChangeTrade={() => {
          setTitle('Change trade');
          setActions(ACTIONS);
        }}
        // select={true}
      />
    );
  };

  const renderScene = SceneMap({
    first: () => (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
      >
        {renderProjects()}
      </ScrollView>
    ),
    second: () => (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
      >
        {renderMaterials()}
      </ScrollView>
    ),
    third: () => (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
      >
        {renderTools()}
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

  const handleSelectTrade = () => {
    console.log('DO SOMETHING');
    setActions([]);
  };

  const ACTIONS = [
    {
      key: 'demo',
      text: 'Demo',
      onPress: handleSelectTrade,
    },
    {
      key: 'paid',
      text: 'Paid',
      onPress: () => setActions([]),
    },
  ];

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={styles.safeArea}>
        <Header
          withBackButton
          rightComponent={<FilterButton onPress={() => null} />}
        />
        <View style={styles.progressHolder}>
          <Typography type="h3" text="Today’s Brief" />
          <View style={styles.progressRow}>
            <SimpleGradientProgressbarView
              style={styles.progress}
              fromColor="#FF9300"
              toColor="#C600F5"
              progress={progress}
              cornerRadius={10.0}
            />
            <View>
              <Typography
                textCenter
                type="h3"
                text={`${(progress * 100).toFixed(0)}%`}
                style={{top: 5}}
              />
              <Typography
                fontType="Medium"
                textCenter
                text="Complete"
                style={{fontSize: 12}}
              />
            </View>
          </View>
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

export default TodaysBrief;
