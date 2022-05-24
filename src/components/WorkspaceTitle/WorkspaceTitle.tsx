import React, {memo, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './WorkspaceTitleStyles';
import {getHitSlop} from 'helpers/styling';
import Typography from 'components/Typography/Typography';
import ArrowDown from 'images/ArrowDown';
import ArrowUp from './assets/arrowUp';
import {
  getWorkspace,
  openWorkspaceSheet,
} from 'store/actions/workspace.actions';
import {getAccountType} from 'store/reducers/auth.reducer';
import {typesOfAccount} from 'typings/types.common';
import {
  getSubcontractorCurrentWorkspaceId,
  setSubcontractorWorkspaceId,
} from 'store/actions/workspace.actions';
import {
  getSubcontractorWorkspaceIdSelector,
  getMyWorkspaceList,
  getMyWorkspaceSelector,
  getCurrentWorkspace,
} from 'store/reducers/workspace.reducer';

const WorkspaceTitle = () => {
  const dispatch = useDispatch();
  const accountType = useSelector(getAccountType);
  const workspaceId = useSelector(getSubcontractorWorkspaceIdSelector);
  const workspaceList = useSelector(getMyWorkspaceList);
  const contractorWorkspace = useSelector(getCurrentWorkspace);
  const onOpenWorkspacesList = () => {
    dispatch(openWorkspaceSheet(true));
  };
  const isContractor = accountType === typesOfAccount.contractor;
  let currentWorkspace = contractorWorkspace;

  return (
    <View style={styles.wrapp}>
      <View style={styles.container}>
        <Typography
          type={'label'}
          text={currentWorkspace?.name}
          style={styles.label}
        />
        <TouchableOpacity
          disabled={isContractor}
          onPress={onOpenWorkspacesList}
          hitSlop={getHitSlop()}
        >
          {!isContractor && <ArrowDown />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

WorkspaceTitle.defaultProps = {};

const MemorizedComponent = memo(WorkspaceTitle);
export {MemorizedComponent as WorkspaceTitle};
