import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {MainFlowContainer} from 'components/MainFlowContainer';
import Spacer from 'components/Spacer/Spacer';
import Typography from 'components/Typography/Typography';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import Card from 'components/Card/Card';
import RightArrowIcon from 'images/RightArrowIcon';
import WhiteCheckIcon from 'images/WhiteCheckIcon';
import PlusIcon from 'images/PlusIcon';
import LocationIcon from 'images/LocationIcon';
import localization from 'localization/localization';
import {Colors} from 'theme';
import ROUTES from 'navigation/routes';
import Placeholder from 'components/Placeholder/Placeholder';
import {clearPhotos, getRooms} from 'store/actions/room.actions';
import {
  getRoomErrorSelector,
  getRoomIsLoadingSelector,
  getRoomsSelector,
} from 'store/reducers/room.reducer';
import {getProjectDetailsSelector} from 'store/reducers/project.reducer';
import {getProjectDetails} from '../../store/actions/projects.actions';
import {showRequestErrorMessage} from 'helpers/functions';
import {styles} from './styles';
import HeaderActions from './HeaderActions';
import {FilterButton} from 'components/FilterButton/HeaderButton';
import Box from 'components/Box/Box';
import {loadAssignee, loadRooms} from 'store/actions/material.tool.actions';
import {getSelectedProject} from 'store/reducers/project.reducer';
import {getCurrentWorkspace} from 'store/reducers/workspace.reducer';
import {AccordionView} from './Accordion';
import {getTools} from 'store/reducers/material.tool.reducer';
import ArrowDown from 'images/ArrowDown';
import colors from 'theme/Colors';
import {getAccountType} from 'store/reducers/auth.reducer';
import {typesOfAccount} from 'typings/types.common';

const Project = () => {
  const {navigate} = useNavigation();
  const {params} = useRoute();
  const dispatch = useDispatch();
  const isLoadingRoom = useSelector(getRoomIsLoadingSelector);
  const error = useSelector(getRoomErrorSelector);
  const rooms = useSelector(getRoomsSelector);
  const selectedProject = useSelector(getSelectedProject);
  const myWorkspace = useSelector(getCurrentWorkspace);

  const materialTool = useSelector(getTools);
  const accountType = useSelector(getAccountType);
  const isContractor = accountType === typesOfAccount.contractor;

  const [isOpened, setOpen] = useState<boolean>(false);
  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);
  const projectDetails = useSelector(getProjectDetailsSelector);
  const materialsTools = projectDetails?.project_materials_tools?.map(
    (item, index) => {
      if (index == 0) {
        item.materials_tools.map(item => {
          item.type = 'material';
          return item;
        });
      } else {
        item.materials_tools.map(item => {
          item.type = 'tool';
          return item;
        });
      }
      return item;
    },
  );

  const onCheckTasks = (taskId: number) => {
    setOpen(true);
    let newChatIds: number[] = [];
    if (checkedTasks.includes(taskId)) {
      newChatIds = checkedTasks.filter(id => taskId !== id);
    } else {
      newChatIds = [...newChatIds, taskId];
    }
    setCheckedTasks(newChatIds);
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(loadRooms(selectedProject.id));
      dispatch(loadAssignee(myWorkspace.id));
    }, [dispatch]),
  );

  const renderRooms = () => (
    <>
      <ViewContainer
        style={styles.container}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography type="h2" text={localization.project.rooms.title} />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            dispatch(clearPhotos());
            navigate(
              ROUTES.ADD_ROOM as never,
              {
                projectId: (params as Record<string, number>)?.id,
              } as never,
            );
          }}
        >
          <PlusIcon color={Colors.white} />
        </TouchableOpacity>
      </ViewContainer>
      <Spacer height={12} />
      <ViewContainer style={styles.container}>
        {isLoadingRoom ? (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size="small" />
          </View>
        ) : !rooms.results.length ? (
          <Placeholder
            backgroundColor={Colors.emptyMessageColor}
            title={localization.project.rooms.placeholder.title}
            titleSize={18}
            titleColor={Colors.gray10}
            text={localization.project.rooms.placeholder.text}
            textSize={14}
            textColor={Colors.gray10}
          />
        ) : (
          <AccordionView
            // withoutViewRoom
            onCheck={onCheckTasks}
            checkedTasks={checkedTasks}
            projects={projectDetails?.project_rooms?.rooms || []}
            projectId={(params as Record<string, number>)?.id}
          />
        )}
      </ViewContainer>
    </>
  );

  const renderTrade = () => (
    <>
      <ViewContainer
        style={styles.container}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography type="h2" text={localization.project.trade.title} />
        <TouchableOpacity style={styles.addBtn} onPress={() => {}}>
          <PlusIcon color={Colors.white} />
        </TouchableOpacity>
      </ViewContainer>
      <Spacer height={12} />
      <ViewContainer style={styles.container}>
        <Placeholder
          backgroundColor={Colors.emptyMessageColor}
          title={localization.project.trade.placeholder.title}
          titleSize={18}
          titleColor={Colors.gray10}
          text={localization.project.trade.placeholder.text}
          textSize={14}
          textColor={Colors.gray10}
        />
      </ViewContainer>
    </>
  );

  const renderMaterials = () => (
    <>
      <ViewContainer
        style={styles.container}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography type="h2" text={localization.project.materials.title} />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            navigate(
              ROUTES.ADD_MATERIAL_OR_TOOL as never,
              {
                index: 1,
                id: 2,
                material: {
                  material: {
                    label: 'Sement',
                    value: 1,
                  },
                  material_note: 'Covered with sement',
                  priority: 'low',
                  room: '90',
                  due_date: '28-04-2022',
                  assignee: '177',
                  description: 'bla bla bla',
                },
                tool: {
                  tool: {
                    label: 'Hummer',
                    value: 1,
                  },
                  priority: 'low',
                  room: '90',
                  due_date: '28-04-2022',
                  assignee: '177',
                  description: 'bla bla bla',
                },
              } as never,
            );
          }}
        >
          <PlusIcon color={Colors.white} />
        </TouchableOpacity>
      </ViewContainer>
      <Spacer height={12} />
      <ViewContainer style={styles.container}>
        {isLoadingRoom ? (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size="small" />
          </View>
        ) : !rooms.results.length ? (
          <Placeholder
            backgroundColor={Colors.emptyMessageColor}
            title={localization.project.rooms.placeholder.title}
            titleSize={18}
            titleColor={Colors.gray10}
            text={localization.project.rooms.placeholder.text}
            textSize={14}
            textColor={Colors.gray10}
          />
        ) : (
          <AccordionView
            withoutViewRoom
            type="materials"
            onCheck={onCheckTasks}
            checkedTasks={checkedTasks}
            projects={materialsTools || []}
            projectId={(params as Record<string, number>)?.id}
          />
        )}
      </ViewContainer>
    </>
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(getRooms({projectId: (params as Record<string, number>)?.id}));
      dispatch(
        getProjectDetails({projectId: (params as Record<string, number>)?.id}),
      );
    }, [dispatch, params]),
  );

  useEffect(() => {
    if (error) {
      showRequestErrorMessage(error);
    }
  }, [error]);
  return (
    <MainFlowContainer
      withBackButton
      boxBackgroundColor={Colors.transparent}
      rightComponent={
        <ViewContainer flexDirection="row">
          <FilterButton onPress={() => {}} />
          <Spacer width={8} />
          {isContractor && <HeaderActions />}
        </ViewContainer>
      }
    >
      {isOpened && (
        <View
          style={{
            backgroundColor: Colors.grey2c,
            borderTopRightRadius: 14,
            borderTopLeftRadius: 14,
            position: 'absolute',
            zIndex: 2,
            left: 0,
            right: 0,
            top: 0,
            height: 210,
            paddingVertical: 39,
          }}
        >
          <ViewContainer
            flexDirection="row"
            justifyContent="space-between"
            style={styles.container}
          >
            <View
              style={{
                height: 78,
                flex: 1,
                backgroundColor: Colors.orange,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 17,
              }}
            >
              <Typography
                text={projectDetails?.items_to_complete}
                fontColor={Colors.white}
                type={'h2'}
              />

              <Typography
                text={'Items to Complete'}
                fontColor={Colors.white}
                type={'label'}
              />
            </View>
            <Spacer width={7} />
            <View
              style={{
                height: 78,
                flex: 1,
                backgroundColor: Colors.black,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 17,
              }}
            >
              <Typography
                text={projectDetails?.change_orders}
                fontColor={Colors.white}
                type={'h2'}
              />

              <Typography
                text={'Change Orders'}
                fontColor={Colors.white}
                type={'label'}
              />
            </View>
          </ViewContainer>
        </View>
      )}
      <Spacer height={39} />
      <View style={{marginLeft: 33, flexDirection: 'row'}}>
        <View>
          <LocationIcon color={Colors.black2} />
        </View>
        <Spacer width={12} />
        <View>
          <Typography
            text={(params as Record<string, string>)?.address}
            style={{fontSize: 16, fontFamily: 'Inter-Bold'}}
          />
          <Typography
            text={`${(params as Record<string, string>)?.state}, ${
              (params as Record<string, string>)?.zip_code
            }`}
            type="label"
          />
        </View>
      </View>
      <Spacer height={20} />
      <ViewContainer
        flexDirection="row"
        justifyContent="space-between"
        style={styles.container}
      >
        <View
          style={{
            height: 78,
            flex: 1,
            backgroundColor: Colors.orange,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 17,
          }}
        >
          <Typography
            text={projectDetails?.items_to_complete}
            fontColor={Colors.white}
            type={'h2'}
          />

          <Typography
            text={'Items to Complete'}
            fontColor={Colors.white}
            type={'label'}
          />
        </View>
        <Spacer width={7} />
        <View
          style={{
            height: 78,
            flex: 1,
            backgroundColor: Colors.black,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 17,
          }}
        >
          <Typography
            text={projectDetails?.change_orders}
            fontColor={Colors.white}
            type={'h2'}
          />

          <Typography
            text={'Change Orders'}
            fontColor={Colors.white}
            type={'label'}
          />
        </View>
      </ViewContainer>
      <Spacer height={24} />
      <Box>
        <Spacer height={24} />
        {renderRooms()}
        <Spacer height={24} />
        {renderTrade()}
        <Spacer height={24} />
        {renderMaterials()}
        <Spacer height={24} />
      </Box>
    </MainFlowContainer>
  );
};

export default Project;
