import React, {useEffect} from 'react';
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

import {styles} from './styles';


const TodaysBriefItem = () => {

    const layout = useWindowDimensions();
    const {setActions, setTitle} = useActionSheet();
    const progressValue = 0.41;
    const dispatch = useDispatch();
    const projects = useSelector(getProjectsSelector);
    const isLoadingProject = useSelector(getIsLoadingProjectsSelector);

    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <SafeAreaView style={styles.safeArea}>
                <Header
                    withBackButton
                    rightComponent={<FilterButton onPress={() => null} />}
                />
                {/* <View style={styles.progressHolder}>
                    <Typography type="h3" text="Today’s Brief" />
                    <View style={styles.progressRow}>
                        <SimpleGradientProgressbarView
                            style={styles.progress}
                            fromColor="#FF9300"
                            toColor="#C600F5"
                            progress={progressValue}
                            cornerRadius={10.0}
                        />
                        <View>
                            <Typography
                                textCenter
                                type="h3"
                                text={`${progressValue * 100}%`}
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
                </View> */}
                {/* <TabView
                    lazy
                    navigationState={{index, routes}}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={setIndex}
                    initialLayout={{width: layout.width}}
                    sceneContainerStyle={styles.sceneContainerStyle}
                /> */}
            </SafeAreaView>
        </>
    )
}

export default TodaysBriefItem