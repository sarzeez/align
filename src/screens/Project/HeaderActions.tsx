import React, {FC, memo, useState} from 'react';
import {Modal, StatusBar, TouchableOpacity, View} from 'react-native';
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
import {styles} from './styles';
import {useDispatch} from 'react-redux';
import {archiveProject, deleteProject} from 'store/actions/projects.actions';
import {setAppLoading} from 'store/actions/auth.actions';
import EditIcon from 'images/EditIcon';
import ArchiveIcon from 'images/ArchiveIcon';
import DeleteIcon from 'images/DeleteIcon';
import PunchListIcon from 'images/PunchListIcon';
import {Colors} from 'theme';
import RoomIcon from 'images/RoomIcon';
import TradeIcon from 'images/TradeIcon';
import ToolsIcon from 'images/ToolsIcon';

const HeaderActions: FC = () => {
  const {params} = useRoute();
  const {navigate} = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const dispatch = useDispatch();

  const havigateToProjects = () => {
    setModalVisible(false);
    dispatch(setAppLoading(false));
    navigate(ROUTES.TAB_BAR as never, {screen: ROUTES.PROJECTS} as never);
  };

  const handleDeleteProject = () => {
    setDeleteModalVisible(false);
    Promise.all([
      dispatch(setAppLoading(true)),
      dispatch(deleteProject({id: (params as any)?.id})),
    ]).then(() => {
      havigateToProjects();
    });
  };

  const handleArchiveProject = () => {
    Promise.all([
      dispatch(setAppLoading(true)),
      dispatch(archiveProject({id: (params as any)?.id})),
    ]).then(() => {
      havigateToProjects();
    });
  };

  return (
    <>
      <TouchableOpacity
        style={[headerStyles.headBtn, headerStyles.shadowBtn]}
        onPress={() => setModalVisible(true)}
      >
        <MenuIcon />
      </TouchableOpacity>
      <StatusBar barStyle={modalVisible ? 'light-content' : 'dark-content'} />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <Typography
              type="h2"
              text={localization.project.modal.actions.title}
            />
            <TouchableOpacity
              style={[headerStyles.headBtn, headerStyles.shadowBtn]}
              onPress={() => setModalVisible(false)}
            >
              <CloseIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <List
              data={localization.project.modal.actions.firstList}
              icons={[
                <PunchListIcon color={Colors.black2} />,
                <RoomIcon color={Colors.black2} />,
                <TradeIcon color={Colors.black2} />,
                <ToolsIcon color={Colors.black2} />,
              ]}
              actions={[
                () => {
                  setModalVisible(false);
                  navigate(
                    ROUTES.ADD_PUNCHLIST_ITEM as never,
                    {id: (params as any)?.id} as never,
                  );
                },
                () => {
                  setModalVisible(false);
                  navigate(ROUTES.ADD_ROOM as never);
                },
                () => {
                  // setNewToolModalVisible(true);
                },
                () => {
                  setModalVisible(false);
                  navigate(ROUTES.ADD_MATERIAL_OR_TOOL as never);
                  // setSelectNewToolModalVisible(true)
                },
              ]}
            />
            <Spacer height={12} />
            <List
              data={localization.project.modal.actions.secondList}
              icons={[
                <EditIcon color={Colors.black2} />,
                <ArchiveIcon color={Colors.black2} />,
                <DeleteIcon color={Colors.black2} />,
              ]}
              actions={[
                () => {
                  setModalVisible(false);
                  navigate(ROUTES.START_PROJECT as never, {...params} as never);
                },
                () => handleArchiveProject(),
                () => {
                  setDeleteModalVisible(true);
                },
              ]}
            />
          </View>
        </SafeAreaView>
        <EventsModal
          transparent
          isShow={deleteModalVisible}
          onCloseModal={() => setDeleteModalVisible(false)}
          type={'error'}
          withTwoButtons
          onSecondButtonPress={() => setModalVisible(false)}
          onFirstButtonPress={handleDeleteProject}
          firstButtonTitle={'Delete'}
          secondButtonTitle={'Dismiss'}
          title={localozation.project.modal.delete.title}
        />
      </Modal>
    </>
  );
};

export default memo(HeaderActions);
