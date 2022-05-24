import React, {useEffect} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import ROUTES from 'navigation/routes';

import Spacer from 'components/Spacer/Spacer';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import Typography from 'components/Typography/Typography';
import {MainFlowContainer} from 'components/MainFlowContainer';
import {WorkspaceTitle} from 'components/WorkspaceTitle';
import Placeholder from 'components/Placeholder/Placeholder';
import ProjectsList from './List';
import PlusIcon from 'images/PlusIcon';
import {getProjects} from 'store/actions/projects.actions';
import {
  getIsLoadingProjectsSelector,
  getProjectsSelector,
} from 'store/reducers/project.reducer';
import localization from 'localization/localization';
import {Colors} from 'theme';
import {styles} from './styles';
import {typesOfAccount} from 'typings/types.common';
import {getAccountType} from 'store/reducers/auth.reducer';
import DrawerToggleButton from 'components/DrawerToggleButton/DrawerToggleButton';
import Box from 'components/Box/Box';
import {
  getCurrentWorkspace,
  getMyWorkspaceSelector,
  getSubcontractorWorkspaceIdSelector,
} from 'store/reducers/workspace.reducer';

const Projects = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const projects = useSelector(getProjectsSelector);
  const accountType = useSelector(getAccountType);
  const isLoading = useSelector(getIsLoadingProjectsSelector);
  const currentWorkspace = useSelector(getCurrentWorkspace);
  const workspaceId = useSelector(getSubcontractorWorkspaceIdSelector);
  let myWorkspace = useSelector(getCurrentWorkspace);
  const contractorWorkspace = useSelector(getMyWorkspaceSelector);
  const isSubContractor = accountType === typesOfAccount.subContractor;
  const isContractor = accountType === typesOfAccount.contractor;

  const workspace_id =
    accountType === typesOfAccount.subContractor
      ? workspaceId
      : currentWorkspace?.id || contractorWorkspace?.id;

  const renderList = () => {
    if (isLoading) {
      return <ActivityIndicator size="small" />;
    }

    if (!projects.length) {
      return (
        <Placeholder
          title={localization.projects.placeholder.title}
          text={localization.projects.placeholder.text}
          titleSize={34}
          textSize={18}
          backgroundColor={Colors.gray8}
        />
      );
    }
    return <ProjectsList data={projects} />;
  };

  // useEffect(() => {
  //   dispatch(getProjects(workspace_id));
  // }, [dispatch, workspace_id]);

  useEffect(() => {
    dispatch(getProjects(isContractor ? myWorkspace?.id : workspaceId));
  }, [myWorkspace?.id, dispatch]);

  return (
    <MainFlowContainer
      headerComponent={
        <>
          <Spacer height={24} />
          <WorkspaceTitle />
          <Spacer height={24} />
        </>
      }
      leftComponent={<DrawerToggleButton />}
      withBackButton={false}
    >
      <Box>
        <Spacer height={24} />
        <ViewContainer
          style={styles.container}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Typography type="h2" text={localization.projects.title} />
          {accountType === typesOfAccount.contractor && (
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigation.navigate(ROUTES.START_PROJECT as never)}
            >
              <PlusIcon color={Colors.white} />
            </TouchableOpacity>
          )}
        </ViewContainer>
        <Spacer height={24} />
        <View style={[styles.container, styles.flexGrow]}>{renderList()}</View>
        <Spacer height={50} />
      </Box>
    </MainFlowContainer>
  );
};

export default Projects;
