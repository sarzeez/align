import reactotron from 'reactotron-react-native';
import {AnyAction} from 'redux';
import {HARD_LOGOUT} from 'store/actions/auth.actions';
import {SET_CURRENT_WORKSPACE} from 'store/actions/user.actions';
import {
  GET_WORKSPACES_LIST,
  GET_WORKSPACE,
  CREATE_WORKSPACE,
  GET_WORKSPACE_BY_ID,
  OPEN_WORKSPACE_SHEET,
  SET_SUBCONTRACTOR_WORKSPACE_ID,
  GET_SUBCONTRACTOR_WORKSPACE_ID,
  SET_CURRENT_WORKSPACE_SUBCONTRACTOR,
  GET_MY_WORKSPACE,
} from 'store/actions/workspace.actions';
import {ActionSuffix} from 'store/models';
import {WorkspacesState} from './types';

export const STATE_KEY = 'workspace';

const initialState: WorkspacesState = {
  currentWorkspace: null,
  workspace: null,
  myWorkspace: null,
  myWorkspaceList: [],
  singleWorkspace: null,
  workspaceSheetIsOpened: false,
  subContractorWorkspaceId: null,
};

const WorkspaceReducer = (
  state: WorkspacesState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case GET_WORKSPACE:
    case GET_MY_WORKSPACE:
      return {
        ...state,
        workspace: action?.payload,
      };
    case `${CREATE_WORKSPACE}${ActionSuffix.SUCCESS}`:
    case SET_CURRENT_WORKSPACE_SUBCONTRACTOR:
      return {
        ...state,
        currentWorkspace: action?.payload?.data?.results.find(
          item => item.id == state.subContractorWorkspaceId,
        ),
      };
    case OPEN_WORKSPACE_SHEET:
      return {
        ...state,
        workspaceSheetIsOpened: action?.payload,
      };
    case `${GET_WORKSPACES_LIST}${ActionSuffix.SUCCESS}`:
      return {
        ...state,
        // currentWorkspace: action?.payload?.data,
        myWorkspaceList: action?.payload?.data?.results,
      };
    case `${GET_SUBCONTRACTOR_WORKSPACE_ID}${ActionSuffix.SUCCESS}`:
    case SET_SUBCONTRACTOR_WORKSPACE_ID:
      return {
        ...state,
        subContractorWorkspaceId: action?.payload?.data?.workspace_id,
      };
    case `${GET_WORKSPACE}${ActionSuffix.SUCCESS}`:
      return {
        ...state,
        myWorkspace: action?.payload?.data,
        currentWorkspace: action?.payload?.data,
      };
    case `${GET_WORKSPACE_BY_ID}${ActionSuffix.SUCCESS}`:
      return {
        ...state,
        singleWorkspace: action?.payload?.data,
        currentWorkspace: action?.payload?.data,
      };
    case `${GET_WORKSPACE_BY_ID}${ActionSuffix.FAIL}`:
      return {
        ...state,
        singleWorkspace: action?.payload?.data,
        currentWorkspace: action?.payload?.data,
      };
    case HARD_LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
export const getCurrentWorkspace = (
  state: Record<string, WorkspacesState>,
): WorkspacesState['currentWorkspace'] => state[STATE_KEY]?.currentWorkspace;

export const getMyWorkspaceList = (
  state: Record<string, WorkspacesState>,
): WorkspacesState['myWorkspaceList'] => state[STATE_KEY].myWorkspaceList;

export const getSingleWorkspace = (
  state: Record<string, WorkspacesState>,
): WorkspacesState['singleWorkspace'] => state[STATE_KEY].singleWorkspace;

export const getWorkspaceSelector = (
  state: Record<string, WorkspacesState>,
): WorkspacesState['workspace'] => state[STATE_KEY].workspace;

export const getMyWorkspaceSelector = (
  state: Record<string, WorkspacesState>,
): WorkspacesState['myWorkspace'] => state[STATE_KEY].myWorkspace;

export const getSubcontractorWorkspaceIdSelector = (
  state: Record<string, WorkspacesState>,
): WorkspacesState['subContractorWorkspaceId'] =>
  state[STATE_KEY].subContractorWorkspaceId;

export const getIsOpenedWorkspaceSheetSelector = (
  state: Record<string, WorkspacesState>,
): WorkspacesState['workspaceSheetIsOpened'] =>
  state[STATE_KEY].workspaceSheetIsOpened;

export default WorkspaceReducer;
