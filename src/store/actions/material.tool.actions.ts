import {AnyAction} from 'redux';
import {Method} from 'store/models';

const namespace = 'PROJECTS';

export const GET_TOOL_TYPES = `${namespace}/GET_TODO_PROJECTS`;
export const GET_ASSIGNEE = `${namespace}/GET_ASSIGNEE`;
export const GET_ROOMS = `${namespace}/GET_ROOMS`;
export const GET_MATERIAL_TYPES = `${namespace}/GET_MATERIAL_TYPES`;

export const loadToolTypes = (): AnyAction => ({
  type: GET_TOOL_TYPES,
  payload: {
    request: {
      method: Method.GET,
      url: `/projects/tools_choice/`,
    },
  },
});

export const loadAssignee = (id: number): AnyAction => ({
  type: GET_ASSIGNEE,
  payload: {
    request: {
      method: Method.GET,
      url: `/users/?workspace_id=${id}`,
    },
  },
});

export const loadRooms = (id: number): AnyAction => ({
  type: GET_ROOMS,
  payload: {
    request: {
      method: Method.GET,
      url: `/projects/${id}/rooms/`,
    },
  },
});

export const loadMaterialTypes = (): AnyAction => ({
  type: GET_MATERIAL_TYPES,
  payload: {
    request: {
      method: Method.GET,
      url: `/projects/materials_choice/`,
    },
  },
});
