import {AnyAction} from 'redux';
import {Method} from '../models';
import {ProjectData, typesOfAccount} from 'typings/types.common';

const namespace = 'WORKSPACE';
const endpoint = '/workspaces/';

export const CREATE_WORKSPACE = `${namespace}/CREATE_WORKSPACE`;
export const JOIN_WORKSPACE = `${namespace}/JOIN_WORKSPACE`;
export const CREATE_PROJECT = `${namespace}/CREATE_PROJECT`;
export const GET_WORKSPACES_LIST = `${namespace}/GET_WORKSPACES_LIST`;
export const GET_WORKSPACE_BY_ID = `${namespace}/GET_WORKSPACE_BY_ID`;
export const GET_WORKSPACE = `${namespace}/GET_WORKSPACE`;
export const GET_MY_WORKSPACE = `${namespace}/GET_MY_WORKSPACE`;
export const LEAVE_WORKSPACE_SUBCONTRACTOR = `${namespace}/LEAVE_WORKSPACE_SUBCONTRACTOR`;
export const SET_CURRENT_WORKSPACE_SUBCONTRACTOR = `${namespace}/SET_CURRENT_WORKSPACE_SUBCONTRACTOR`;
export const REVOKE_SUBCONTRACTOR = `${namespace}/REVOKE_SUBCONTRACTOR`;
export const OPEN_WORKSPACE_SHEET = `${namespace}/OPEN_WORKSPACE_SHEET`;
export const SET_SUBCONTRACTOR_WORKSPACE_ID = `${namespace}/SET_SUBCONTRACTOR_WORKSPACE_ID`;
export const GET_SUBCONTRACTOR_WORKSPACE_ID = `${namespace}/GET_SUBCONTRACTOR_WORKSPACE_ID`;

export const createWorkspace = (workspaceBody: {name: string}): AnyAction => ({
  type: CREATE_WORKSPACE,
  payload: {
    request: {
      method: Method.POST,
      data: workspaceBody,
      url: `${endpoint}contractor/`,
    },
  },
});

export const getWorkspace = (): AnyAction => ({
  type: GET_WORKSPACE,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}contractor/`,
    },
  },
});

export const getMyWorkspace = (id: number): AnyAction => ({
  type: GET_MY_WORKSPACE,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}contractor/${id}`,
    },
  },
});

export const joinWorkspace = (pin: number): AnyAction => ({
  type: JOIN_WORKSPACE,
  payload: {
    request: {
      method: Method.POST,
      data: {pin},
      url: `${endpoint}subcontractor/join/`,
    },
  },
});
export const inviteMembers = (email: string, id: number): AnyAction => ({
  type: JOIN_WORKSPACE,
  payload: {
    request: {
      method: Method.POST,
      data: {email, id},
      url: `${endpoint}contractor/send_invite/`,
    },
  },
});

export const createProject = (project: ProjectData): AnyAction => ({
  type: CREATE_PROJECT,
  payload: {
    request: {
      method: Method.POST,
      data: project,
      url: '/projects/',
    },
  },
});

export const revokeSubcontractor = (data: {
  id: number | null;
  email: string | null;
}): AnyAction => ({
  type: REVOKE_SUBCONTRACTOR,
  payload: {
    request: {
      method: Method.PUT,
      data,
      url: `${endpoint}contractor/remove_subcontractor/`,
    },
  },
});

export const getWorkspacesList = (role: typesOfAccount): AnyAction => ({
  type: GET_WORKSPACES_LIST,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}${
        role === typesOfAccount.contractor ? 'contractor' : 'subcontractor'
      }/`,
    },
  },
});

export const getSubcontractorCurrentWorkspaceId = (): AnyAction => ({
  type: GET_SUBCONTRACTOR_WORKSPACE_ID,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}subcontractor/receive_workspace/`,
    },
  },
});

export const getWorkspaceById = (
  id: number,
  role: typesOfAccount,
): AnyAction => ({
  type: GET_WORKSPACE_BY_ID,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}${
        role === typesOfAccount.contractor ? 'contractor' : 'subcontractor'
      }/${id}/`,
    },
  },
});

export const leaveWorkspaceSubcontractor = (id: number): AnyAction => ({
  type: LEAVE_WORKSPACE_SUBCONTRACTOR,
  payload: {
    request: {
      method: Method.PUT,
      data: {id},
      url: `${endpoint}subcontractor/leave/`,
    },
  },
});

export const setCurrentWorkspaceSubcontractor = (
  workspace_id: number,
): AnyAction => ({
  type: SET_CURRENT_WORKSPACE_SUBCONTRACTOR,
  payload: {
    request: {
      method: Method.POST,
      data: {workspace_id},
      url: `${endpoint}subcontractor/set_workspace/`,
    },
  },
});

export const openWorkspaceSheet = (payload: boolean): AnyAction => ({
  type: OPEN_WORKSPACE_SHEET,
  payload,
});

export const setSubcontractorWorkspaceId = (payload: number): AnyAction => ({
  type: SET_SUBCONTRACTOR_WORKSPACE_ID,
  payload,
});
