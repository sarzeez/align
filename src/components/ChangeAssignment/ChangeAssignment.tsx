import React, {FC, Fragment, memo, useMemo, useEffect, useState} from 'react';
import {Modal, ScrollView, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import MenuIcon from 'images/MenuIcon';
import Typography from 'components/Typography/Typography';
import List from 'components/List/List';
import Spacer from 'components/Spacer/Spacer';
import EventsModal from 'components/EventsModal/EventsModal';
import SelectOptionModal from 'components/SelectOptionModal/SelectOptionModal';
import CloseIcon from 'images/CloseIcon';
import localization from 'localization/localization';
import ROUTES from 'navigation/routes';
import localozation from 'localization/localization';
import {styles as headerStyles} from 'components/Header/styles';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  archiveProject,
  deleteProject,
  getSingleTask,
} from 'store/actions/projects.actions';
import {setAppLoading} from 'store/actions/auth.actions';
import EditIcon from 'images/EditIcon';
import ArchiveIcon from 'images/ArchiveIcon';
import DeleteIcon from 'images/DeleteIcon';
import PunchListIcon from 'images/PunchListIcon';
import {Colors} from 'theme';
import RoomIcon from 'images/RoomIcon';
import TradeIcon from 'images/TradeIcon';
import ToolsIcon from 'images/ToolsIcon';
import ChangeAssignmentItem from './ChangeAssignmentItem';
import {getToggleAssigneesModal} from 'store/reducers/project.reducer';
import {toggleAssigneesModal} from 'store/actions/projects.actions';
import {getMessagesUsers} from 'store/actions/user.actions';
import {getMyWorkspaceSelector} from 'store/reducers/workspace.reducer';
import {getMessagesUsersSelector} from 'store/reducers/profile.reducer';
import {CustomButton} from 'components/CustomButton';
import {changeAssigneeOfSingleTask} from 'store/actions/projects.actions';

const ChangeAssignment = ({
  projectId,
  roomId,
  taskId,
  assignee,
  trade,
}: {
  projectId: number;
  roomId: number;
  taskId: number;
  assignee: number;
  trade: number;
}) => {
  const modalVisible = useSelector(getToggleAssigneesModal);
  const [assigneeId, setAssigneeId] = useState(null);
  const currentWorkspace = useSelector(getMyWorkspaceSelector);
  const dispatch = useDispatch();
  const assignees = useSelector(getMessagesUsersSelector);
  const workspaceId = currentWorkspace?.id;

  const handleUpdateAssignee = () => {
    const data = {
      trade,
      assignees,
      new_assignee: assigneeId?.id,
    };
    Promise.all([
      dispatch(
        changeAssigneeOfSingleTask({
          projectId,
          roomId,
          data,
          id: taskId,
        }),
      ),
    ]).then(() => {
      dispatch(
        getSingleTask({
          projectId,
          roomId,
          id: taskId,
        }),
      );
      clearState();
      dispatch(toggleAssigneesModal(false));
    });
  };

  const clearState = () => {
    setAssigneeId(null);
  };

  useEffect(() => {
    workspaceId && dispatch(getMessagesUsers(workspaceId));
  }, [dispatch, workspaceId]);

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => toggleAssigneesModal(!modalVisible)}
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <Typography
              type="h2"
              text={localization.addPunchList.changeAssigneeTitle}
            />
            <TouchableOpacity
              style={[headerStyles.headBtn, headerStyles.shadowBtn]}
              onPress={() => {
                dispatch(toggleAssigneesModal(false));
                clearState();
              }}
            >
              <CloseIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <Spacer height={12} />
            <ScrollView>
              {assignees?.map(item => (
                <Fragment key={item.id}>
                  <ChangeAssignmentItem
                    onPress={() => setAssigneeId(item)}
                    isChecked={item?.id === assigneeId?.id}
                    name={item.full_name}
                    avatar={item.avatar}
                  />
                  <Spacer height={10} />
                </Fragment>
              ))}
              <View style={styles.buttonWrapper}>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title={localization.addPunchList.changeAssigneeButtonTitle}
                    onPress={handleUpdateAssignee}
                    bgColorActive={Colors.orange}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default memo(ChangeAssignment);
