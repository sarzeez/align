import {InfoItem} from 'components/InfoItem/InfoItem';
import {ProjectParticipant} from 'components/ProjectParticipant/ProjectParticipant';
import {SelectWorkspaceModal} from 'components/SelectWorkspaceModal/SelectWorkspaceModal';
import {Workspace} from 'components/Workspace/Workspace';
import React, {memo, useCallback, useRef, useEffect, useState} from 'react';
import {
  useNavigation,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {WorkspaceTitle} from 'components/WorkspaceTitle';
import Header from 'components/Header/Header';
import ProfileImage from 'images/ProfileImage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'theme';
import DrawerToggleButton from 'components/DrawerToggleButton/DrawerToggleButton';
import AddWorkspaceIcon from 'images/AddWorkspaceIcon';
import Spacer from 'components/Spacer/Spacer';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import Typography from 'components/Typography/Typography';
import ROUTES from 'navigation/routes';
import {MainFlowContainer} from 'components/MainFlowContainer';
import {useDispatch, useSelector} from 'react-redux';
import {getWorkspacesList} from 'store/actions/workspace.actions';
import {getMyWorkspaceList} from 'store/reducers/workspace.reducer';
import {typesOfAccount} from 'typings/types.common';
import PlusIcon from 'images/PlusIcon';

export type TestScreenProps = {};

const WorkspaceSubcontractor: React.FC<TestScreenProps> = props => {
  const bottomSheetModalRef = useRef(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myWorkspaceList = useSelector(getMyWorkspaceList);
  const myFirstWorkspace = myWorkspaceList?.length && myWorkspaceList[0];
  const [currentWorkspace, setCurrentWorksapce] = useState({});

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const setWorkspace = workspace => {
    setCurrentWorksapce(workspace);
  };

  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        dispatch(getWorkspacesList(typesOfAccount.subContractor));
      }
    }, [isFocused]),
  );

  useEffect(() => {
    !!myFirstWorkspace && setCurrentWorksapce(myFirstWorkspace);
  }, [myFirstWorkspace]);

  const joinWithPin = () =>
    navigation.navigate(
      ROUTES.JOIN_A_WORKSPACE as never,
      {isNotAuthenticated: true} as never,
    );

  const onWorkspaceDetails = (id: number) => {
    navigation.navigate(ROUTES.WORKSPACE_DETAILS as never, {id} as never);
  };

  const renderWorkspace = () => {
    return (
      !!myWorkspaceList?.length &&
      myWorkspaceList.map(item => (
        <ProjectParticipant
          key={item.id}
          onPress={() => onWorkspaceDetails(item.id)}
          activity={item?.is_active ? 'active' : 'inactive'}
          text={item?.name}
          containerStyle={{
            backgroundColor: Colors.white,
            borderColor: Colors.gray4,
            marginBottom: 8,
          }}
        />
      ))
    );
  };

  return (
    <MainFlowContainer
      withBackButton={false}
      leftComponent={<DrawerToggleButton />}
    >
      <View style={styles.globalContainer}>
        <View style={[styles.block, styles.workspaceTitleCont]}>
          <WorkspaceTitle
            name={currentWorkspace?.name}
            withArrowUp
            onSelectPress={() => {
              handlePresentModalPress();
            }}
          />
        </View>
        <Spacer height={25} />
        <View style={styles.participantsContainer}>
          <Spacer height={22} />
          <ViewContainer
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography text="Workspaces" type="h2" />
            <TouchableOpacity onPress={joinWithPin} style={styles.addBtn}>
              <PlusIcon color={Colors.white} />
            </TouchableOpacity>
          </ViewContainer>
          <Spacer height={18} />

          {renderWorkspace()}
        </View>
      </View>
    </MainFlowContainer>
  );
};

WorkspaceSubcontractor.defaultProps = {};

const MemorizedComponent = memo(WorkspaceSubcontractor);
export {MemorizedComponent as WorkspaceSubcontractor};
