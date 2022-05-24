import {View, ActivityIndicator, Text} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import ROUTES from 'navigation/routes';
import {typesOfAccount} from 'typings/types.common';
import {DEVICE_WIDTH, IS_IOS, PADDING_HORIZONTAL} from 'helpers/constants';

// Store
import {getUser} from 'store/actions/user.actions';

import {
  getMyWorkspace,
  getSubcontractorCurrentWorkspaceId,
  getWorkspace,
  getWorkspaceById,
  getWorkspacesList,
  setCurrentWorkspaceSubcontractor,
} from 'store/actions/workspace.actions';
import {
  getAccountType,
  getContinueWithoutPin,
} from 'store/reducers/auth.reducer';

import {getTodaysBrief} from 'store/actions/homepage.actions';
import {todaysBrief} from 'store/reducers/homepage.reducer';

import {getProjects} from 'store/actions/projects.actions';
import {
  getProjectsSelector,
  getIsLoadingProjectsSelector,
} from 'store/reducers/project.reducer';
// Store

import {WorkspaceTitle} from 'components/WorkspaceTitle';
import {TitledList} from 'components/TitledList';
import {SlideshowList} from 'components/SlideshowList';
import {styles} from './HomeStyles';
import {BriefItem} from 'components/BriefItem';

import localization from 'localization/localization';

import {MainFlowContainer} from 'components/MainFlowContainer';
import Spacer from 'components/Spacer/Spacer';
import DrawerToggleButton from 'components/DrawerToggleButton/DrawerToggleButton';
import NoWorkspace from './NoWorkspace';
import {
  getSubcontractorWorkspaceIdSelector,
  getCurrentWorkspace,
  getMyWorkspaceList,
} from 'store/reducers/workspace.reducer';
import {getProfile} from 'store/reducers/profile.reducer';
import ProjectsList from '../../screens/Projects/List';
import Placeholder from 'components/Placeholder/Placeholder';
import {Colors} from 'theme';
import MessageCarousel from 'components/MessageCarousel/MessageCarousel';
import {getMessagesRoomSelector} from 'store/reducers/messages.reducer';
import {loadTodoProjects} from 'store/actions/briefs.actions';
import {registerDevice} from 'store/actions/auth.actions';
import {getDeviceState} from 'store/reducers/auth.reducer';
import {getChatRooms, getMessages} from 'store/actions/messages.actions';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const accountType = useSelector(getAccountType);
  let myWorkspace = useSelector(getCurrentWorkspace);
  const projects = useSelector(getProjectsSelector);
  const [viewProject, setViewProject] = useState(false);
  const workspaceId = useSelector(getSubcontractorWorkspaceIdSelector);
  const briefs = useSelector(todaysBrief);
  const messages = useSelector(getMessagesRoomSelector);
  const isLoading = useSelector(getIsLoadingProjectsSelector);
  const deviceState = useSelector(getDeviceState);
  const noWorkspace = useSelector(getContinueWithoutPin);
  const CAROUSEL_WIDTH = DEVICE_WIDTH - 56;
  const isFocused = useIsFocused();
  const [currentWorkspace, setCurrentWorksapce] = useState({});

  const isSubContractor = accountType === typesOfAccount.subContractor;
  const continueWithoutPin = useSelector(getContinueWithoutPin);
  const subContractorWithoutWorkspace = isSubContractor && !myWorkspace?.name;
  const access = subContractorWithoutWorkspace && !continueWithoutPin;

  const myWorkspaceList = useSelector(getMyWorkspaceList);
  const myFirstWorkspace = myWorkspaceList?.length && myWorkspaceList[0];
  const profile = useSelector(getProfile);
  const isContractor = accountType === typesOfAccount.contractor;

  useEffect(() => {
    dispatch(
      getWorkspacesList(
        profile?.contractor
          ? typesOfAccount.contractor
          : typesOfAccount.subContractor,
      ),
    );
  }, []);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWorkspacesList(accountType as any));
  }, [accountType, dispatch]);

  useEffect(() => {
    dispatch(getTodaysBrief(myWorkspace?.id));
  }, [myWorkspace?.id, dispatch]);

  useEffect(() => {
    dispatch(getProjects(isContractor ? myWorkspace?.id : workspaceId));
  }, [myWorkspace?.id, dispatch]);

  useEffect(() => {
    dispatch(loadTodoProjects(myWorkspace?.id));
  }, [myWorkspace?.id, dispatch]);

  useEffect(() => {
    dispatch(getChatRooms());
  }, [myWorkspace?.id, dispatch]);

  useEffect(() => {
    const data = {
      identifier: deviceState?.pushToken,
      device_type: IS_IOS ? 0 : 1,
    };

    dispatch(registerDevice(data))
      .then(resp => {
        console.log(JSON.stringify(resp));
      })
      .catch(err => console.log(JSON.stringify(err)));
  }, [deviceState, dispatch]);

  useEffect(() => {
    !!accountType &&
      !isContractor &&
      Promise.all([dispatch(getSubcontractorCurrentWorkspaceId())]).then(
        ([response]) => {
          let id = response?.payload?.data?.workspace_id;
          dispatch(getWorkspaceById(id, accountType));
        },
      );

    if (isContractor) {
      Promise.all([dispatch(getWorkspace())]).then(([response]) => {
        console.log('ID', response?.payload?.data?.id);
        //dispatch(response?.payload?.data?.id);
      });
    }
  }, [accountType, isContractor, dispatch]);

  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.spacing}>
        <BriefItem
          {...item}
          onPress={() =>
            navigation.navigate(
              ROUTES.TODAYS_BRIEF as never,
              {
                index,
              } as never,
            )
          }
        />
      </View>
    );
  };

  // if (subContractorWithoutWorkspace) {
  //   return <NoWorkspace />;
  // }

  const renderList = () => {
    if (isLoading) {
      return <ActivityIndicator size="small" />;
    }

    if (!projects.length) {
      return (
        <Placeholder
          // title={localization.projects.placeholder.title}
          text={localization.projects.placeholder.text}
          titleSize={34}
          textSize={18}
          backgroundColor={Colors.gray8}
        />
      );
    }

    return <ProjectsList data={projects} viewText="View All Projects" />;
  };

  return (
    <>
      {access ? (
        <NoWorkspace />
      ) : (
        <MainFlowContainer
          headerComponent={
            <>
              <Spacer height={24} />
              <WorkspaceTitle
              // name={myWorkspace?.name || localization.myWorkspace.heading}
              // onSelectPress={() => {}}
              />
              <Spacer height={24} />
            </>
          }
          leftComponent={<DrawerToggleButton />}
          withBackButton={false}
        >
          <View style={styles.mainContainer}>
            <View style={styles.block}>
              {!!isSubContractor ? (
                <TitledList
                  title={localization.homeScreen.yourProjects}
                  contentLength={projects?.length}
                  emptyText={localization.homeScreen.noProjects}
                >
                  <View>
                    {renderList()}
                    <Spacer height={16} />
                  </View>
                </TitledList>
              ) : (
                <TitledList
                  title={localization.homeScreen.yourProjects}
                  contentLength={projects?.length}
                  emptyText={localization.homeScreen.noProjects}
                  onPlusPress={() =>
                    navigation.navigate(ROUTES.START_PROJECT as never)
                  }
                >
                  <View>
                    {renderList()}
                    <Spacer height={16} />
                  </View>
                </TitledList>
              )}
            </View>
            <View style={styles.briefCont}>
              <TitledList
                title={localization.homeScreen.todaysBrief}
                contentLength={briefs?.length}
                emptyText={localization.homeScreen.noBrief}
              >
                <View style={styles.horizontalContainer}>
                  <SlideshowList
                    data={briefs}
                    renderItem={renderItem}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </TitledList>
            </View>
            <View style={styles.block}>
              <TitledList
                title={localization.homeScreen.yourMessages}
                contentLength={messages.length}
                emptyText={localization.homeScreen.noMessages}
              >
                <View style={styles.messageCarouselContainer}>
                  <MessageCarousel list={messages} />
                </View>
              </TitledList>
            </View>
          </View>
        </MainFlowContainer>
      )}
    </>
  );
};

export default Home;
