import {AnyAction} from 'redux';
import {HARD_LOGOUT} from 'store/actions/auth.actions';
import {
  GET_TOOL_TYPES,
  GET_ROOMS,
  GET_ASSIGNEE,
  GET_MATERIAL_TYPES,
} from 'store/actions/material.tool.actions';
import {ActionSuffix} from 'store/models';
import {MaterialToolState} from './types';

export const STATE_KEY = 'material_tool';

const initialState: MaterialToolState = {
  tool: [],
  room: [],
  assignee: [],
  material: [],
};

const MaterialToolReducer = (
  state: MaterialToolState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case `${GET_TOOL_TYPES}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        tool: action.payload.data.results.map((tool: any) => ({
          value: tool.id,
          label: tool.name,
        })),
      };
    }

    case `${GET_ROOMS}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        room: action.payload.data.results.map((item: any) => ({
          value: item.id,
          label: item.name,
        })),
      };
    }

    case `${GET_ASSIGNEE}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        assignee: action.payload.data.results.map((item: any) => ({
          value: item.id,
          label: item.full_name,
        })),
      };
    }

    case `${GET_MATERIAL_TYPES}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        material: action.payload.data.results.map((tool: any) => ({
          value: tool.id,
          label: tool.name,
        })),
      };
    }
    case HARD_LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};

// todo
export const getTools = (state: Record<string, MaterialToolState>) =>
  state[STATE_KEY];

export default MaterialToolReducer;
