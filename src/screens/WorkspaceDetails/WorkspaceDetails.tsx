import {ProjectParticipant} from 'components/ProjectParticipant/ProjectParticipant';
import {Workspace} from 'components/Workspace/Workspace';
import React, {memo, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';

import {Colors} from 'theme';
import Spacer from 'components/Spacer/Spacer';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import Typography from 'components/Typography/Typography';
import {MainFlowContainer} from 'components/MainFlowContainer';
import {FilterButton} from 'components/FilterButton/HeaderButton';
import localization from 'localization/localization';
import {setAppLoading} from 'store/actions/auth.actions';
import {ActionSuffix} from 'store/models';
import ROUTES from 'navigation/routes';
import {useDispatch, useSelector} from 'react-redux';
import {
  getWorkspaceById,
  setCurrentWorkspaceSubcontractor,
} from 'store/actions/workspace.actions';
import {typesOfAccount} from 'typings/types.common';
import {getSingleWorkspace} from 'store/reducers/workspace.reducer';
import EventsModal from 'components/EventsModal/EventsModal';
import WarningIcon from 'images/WarningIcon';
import {leaveWorkspaceSubcontractor} from 'store/actions/workspace.actions';
import {getWorkspacesList} from 'store/actions/workspace.actions';

const WorkspaceDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const singleWorkspace = useSelector(getSingleWorkspace);
  const {params} = useRoute();
  const projectId = (params as Record<string, number>)?.id;
  const [modalIsOpen, setModalOpen] = useState<boolean>(false);
  const onLeaveWorkspace = () => {
    setModalOpen(true);
  };

  const submitOfLeavingFromWorkspace = async () => {
    setModalOpen(false);
    //dispatch(setAppLoading(true));
    try {
      const request = await dispatch(leaveWorkspaceSubcontractor(projectId));

      if (request?.type?.includes(ActionSuffix.SUCCESS)) {
        dispatch(setAppLoading(false));
        dispatch(setCurrentWorkspaceSubcontractor(null));
        navigation.goBack();
      } else {
        throw new Error(request?.type);
      }
    } catch (e) {
      console.log(e);
      // showRequestErrorMessage(e.response?.data?.email);
      // Alert.alert(e as string);
    } finally {
      dispatch(setAppLoading(false));
    }
  };

  useEffect(() => {
    projectId &&
      dispatch(getWorkspaceById(projectId, typesOfAccount.subContractor));
  }, [projectId, dispatch]);

  return (
    <MainFlowContainer
      withBackButton
      rightComponent={<FilterButton onPress={() => console.log()} />}
    >
      <View style={styles.globalContainer}>
        <Spacer height={42} />
        <View style={{width: '100%', marginLeft: 28}}>
          <Typography
            text={'Workspace'}
            fontColor={Colors.black}
            type={'label'}
          />
          <Typography
            text={singleWorkspace?.name}
            fontColor={Colors.black}
            type={'h2'}
          />
          <Spacer height={8} />
          <View
            style={{
              backgroundColor: singleWorkspace?.is_active
                ? Colors.green
                : Colors.red,
              borderRadius: 8,
              height: 25,
              width: 106,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              text={singleWorkspace?.is_active ? 'Active' : 'Inactive'}
              fontColor={Colors.white}
              type={'label'}
              style={{fontFamily: 'Inter-Bold'}}
            />
          </View>
        </View>
        <Spacer height={22} />
        <View style={styles.participantsContainer}>
          <Spacer height={22} />
          <ViewContainer flexDirection="row" justifyContent="space-between">
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
                text={singleWorkspace?.items_to_complete}
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
                text={singleWorkspace?.projects}
                fontColor={Colors.white}
                type={'h2'}
              />

              <Typography
                text={'Projects'}
                fontColor={Colors.white}
                type={'label'}
              />
            </View>
          </ViewContainer>
          <Spacer height={26} />
          <ViewContainer justifyContent="center">
            <Typography text="Members" type="h2" />
            <View
              style={{
                position: 'absolute',
                right: -24,
                width: '71%',
                height: 1,
                backgroundColor: Colors.gray4,
              }}
            />
          </ViewContainer>
          <Spacer height={12} />
          {!!singleWorkspace?.members?.length &&
            singleWorkspace?.members.map(item => (
              <ProjectParticipant
                key={item.id}
                onPress={() => console.log(item.id)}
                activity="active"
                text={item.full_name}
                avatar={item.avatar}
                containerStyle={{
                  backgroundColor: Colors.white,
                  borderColor: Colors.gray4,
                }}
              />
            ))}
        </View>
        <ViewContainer
          flex={1}
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={onLeaveWorkspace}
          >
            <Typography
              type="h3"
              fontColor={Colors.gray7}
              text={localization.workspaceDetails.leaveWorkspace}
            />
          </TouchableOpacity>
        </ViewContainer>
      </View>
      <EventsModal
        isShow={modalIsOpen}
        onCloseModal={() => {
          setModalOpen(false);
        }}
        onFirstButtonPress={submitOfLeavingFromWorkspace}
        onSecondButtonPress={() => {
          setModalOpen(false);
        }}
        title={localization.myWorkspace.modalHeader}
        underTitle={localization.workspaceDetails.modalTitle}
        firstButtonTitle={localization.workspaceDetails.yes}
        secondButtonTitle={localization.workspaceDetails.no}
        icon={<WarningIcon />}
        withTwoButtons
      />
    </MainFlowContainer>
  );
};

WorkspaceDetails.defaultProps = {};

const MemorizedComponent = memo(WorkspaceDetails);
export {MemorizedComponent as WorkspaceDetails};
