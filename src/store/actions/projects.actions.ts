import {AnyAction} from 'redux';
import {Method} from 'store/models';
import {ProjectData} from 'typings/types.common';

const namespace = 'PROJECT';

export const SELECTED_PROJECT_ITEM = `${namespace}/SELECTED_PROJECT_ITEM`;
export const CREATE_PROJECT = `${namespace}/CREATE_PROJECT`;
export const UPDATE_PROJECT = `${namespace}/UPDATE_PROJECT`;
export const DELETE_PROJECT = `${namespace}/DELETE_PROJECT`;
export const ARCHIVE_PROJECT = `${namespace}/ARCHIVE_PROJECT`;
export const GET_PROJECTS = `${namespace}/GET_PROJECTS`;
export const GET_TRADES = `${namespace}/GET_TRADES`;
export const GET_PROJECT_DETAIL = `${namespace}/GET_PROJECT_DETAIL`;
export const GET_SINGLE_TASK = `${namespace}/GET_SINGLE_TASK`;
export const GET_SINGLE_MATERIAL = `${namespace}/GET_SINGLE_MATERIAL`;
export const GET_SINGLE_TOOL = `${namespace}/GET_SINGLE_TOOL`;
export const CHECK_TASK_AS_COMPLETE = `${namespace}/CHECK_TASK_AS_COMPLETE`;
export const DELETE_SINGLE_TASK = `${namespace}/DELETE_SINGLE_TASK`;
export const ARCHIVE_SINGLE_TASK = `${namespace}/ARCHIVE_SINGLE_TASK`;
export const TOGGLE_ASSIGNEES_MODAL = `${namespace}/TOGGLE_ASSIGNEES_MODAL`;
export const CHANGE_ASSIGNEE_SINGLE_TASK = `${namespace}/CHANGE_ASSIGNEE_SINGLE_TASK`;

export const setSelectedProjectItem = (project: ProjectData): AnyAction => ({
  type: SELECTED_PROJECT_ITEM,
  payload: project,
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

export const updateProject = ({id, ...data}: ProjectData): AnyAction => ({
  type: UPDATE_PROJECT,
  payload: {
    request: {
      method: Method.PATCH,
      data,
      url: `/projects/${id}/`,
    },
  },
});

export const deleteProject = ({id}: {id: number}): AnyAction => ({
  type: DELETE_PROJECT,
  payload: {
    id,
    request: {
      method: Method.DELETE,
      url: `/projects/${id}/`,
    },
  },
});

export const archiveProject = ({id}: {id: number}): AnyAction => ({
  type: ARCHIVE_PROJECT,
  payload: {
    id,
    request: {
      data: {},
      method: Method.PUT,
      url: `/projects/${id}/archive/`,
    },
  },
});

export const getProjects = (id?: number): AnyAction => ({
  type: GET_PROJECTS,
  payload: {
    request: {
      method: Method.GET,
      url: `/projects/?workspace=${id}`,
    },
  },
});

export const getTrades = (workspaceId?: number): AnyAction => ({
  type: GET_TRADES,
  payload: {
    request: {
      method: Method.GET,
      url: `/projects/trades/?workspace_id=${workspaceId}`,
    },
  },
});

export const getPunchList = (projectId: number, roomId: number): AnyAction => ({
  type: GET_TRADES,
  payload: {
    request: {
      method: Method.GET,
      url: `/projects/${projectId}/rooms/${roomId}/punch_lists/`,
    },
  },
});

export const getSingleTask = ({
  projectId,
  roomId,
  id,
}: {
  projectId: number;
  roomId: number;
  id: number;
}): AnyAction => ({
  type: GET_SINGLE_TASK,
  payload: {
    request: {
      method: Method.GET,
      url: `/projects/${projectId}/rooms/${roomId}/punch_lists/${id}/`,
    },
  },
});

export const getSingleMaterial = ({
  projectId,
  roomId,
  id,
}: {
  projectId: number;
  roomId: number;
  id: number;
}): AnyAction => ({
  type: GET_SINGLE_MATERIAL,
  payload: {
    request: {
      method: Method.GET,
      url: `/projects/${projectId}/rooms/${roomId}/materials/${id}/`,
    },
  },
});

export const getSingleTool = ({
  projectId,
  roomId,
  id,
}: {
  projectId: number;
  roomId: number;
  id: number;
}): AnyAction => ({
  type: GET_SINGLE_TOOL,
  payload: {
    request: {
      method: Method.GET,
      url: `/projects/${projectId}/rooms/${roomId}/tools/${id}/`,
    },
  },
});

export const chekTaskAsComplete = ({
  projectId,
  roomId,
  id,
}: {
  projectId: number;
  roomId: number;
  id: number;
}): AnyAction => ({
  type: CHECK_TASK_AS_COMPLETE,
  payload: {
    request: {
      method: Method.PUT,
      url: `/projects/${projectId}/rooms/${roomId}/punch_lists/${id}/done/`,
    },
  },
});

export const deleteSingleTask = ({
  projectId,
  roomId,
  id,
}: {
  projectId: number;
  roomId: number;
  id: number;
}): AnyAction => ({
  type: DELETE_SINGLE_TASK,
  payload: {
    request: {
      method: Method.DELETE,
      url: `/projects/${projectId}/rooms/${roomId}/punch_lists/${id}/`,
    },
  },
});

export const archiveSingleTask = ({
  projectId,
  roomId,
  id,
}: {
  projectId: number;
  roomId: number;
  id: number;
}): AnyAction => ({
  type: ARCHIVE_SINGLE_TASK,
  payload: {
    request: {
      method: Method.PUT,
      url: `/projects/${projectId}/rooms/${roomId}/punch_lists/${id}/archive/`,
    },
  },
});

export const changeAssigneeOfSingleTask = ({
  projectId,
  roomId,
  id,
  data,
}: {
  projectId: number;
  roomId: number;
  id: number;
  data: {assignee: number; trade: number; new_assignee: number};
}): AnyAction => ({
  type: CHANGE_ASSIGNEE_SINGLE_TASK,
  payload: {
    request: {
      method: Method.PUT,
      data,
      url: `/projects/${projectId}/rooms/${roomId}/punch_lists/${id}/change_assignee/`,
    },
  },
});

export const getProjectDetails = ({
  projectId,
}: {
  projectId: number;
}): AnyAction => ({
  type: GET_PROJECT_DETAIL,
  payload: {
    request: {
      method: Method.GET,
      url: `/projects/${projectId}/detail/`,
    },
  },
});

export const toggleAssigneesModal = (val: boolean): AnyAction => ({
  type: TOGGLE_ASSIGNEES_MODAL,
  payload: val,
});
