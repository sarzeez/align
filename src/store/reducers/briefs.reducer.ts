import dayjs from 'dayjs';
import {AnyAction} from 'redux';
import {HARD_LOGOUT} from 'store/actions/auth.actions';
import {
  GET_MATERIALS_PROJECTS,
  GET_TODO_TASKS_BY_ROOM_ID,
  GET_TODO_PROJECTS,
  GET_TOOLS_PROJECTS,
} from 'store/actions/briefs.actions';
import {ActionSuffix} from 'store/models';
import {boolean, string} from 'yup';
import {BriefsState, ProjectState} from './types';

export const STATE_KEY = 'briefs';

const initialState: BriefsState = {
  todo: {
    projects: [],
    filter: [],
    error: '',
    loading: false,
    progress: 0,
  },
  materials: {
    projects: [],
    filter: [],
    error: '',
    loading: false,
  },

  tools: {
    projects: [],
    filter: [],
    error: '',
    loading: false,
  },
};

const BriefsReducer = (
  state: BriefsState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case `${GET_TODO_PROJECTS}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        todo: {
          ...state.todo,
          projects: action.payload.data.results[0].projects,
          progress: action.payload.data.results[0].progress_bar,
        },
      };
    }

    case `${GET_MATERIALS_PROJECTS}${ActionSuffix.SUCCESS}`: {
      const newData = action.payload.data.results[0].projects?.map(
        (project: any) => ({
          ...project,
          rooms: project?.rooms?.map((room: any) => ({
            ...room,
            materials: room?.materials?.map((material: any) => ({
              ...material,
              due_date: dayjs(material?.due_date).format('MMM DD'),
            })),
          })),
        }),
      );
      return {
        ...state,
        materials: {
          ...state.materials,
          projects: newData,
        },
      };
    }

    case `${GET_TOOLS_PROJECTS}${ActionSuffix.SUCCESS}`: {
      const newData = action.payload.data.results[0].projects?.map(
        (project: any) => ({
          ...project,
          rooms: project?.rooms?.map((room: any) => ({
            ...room,
            tools: room?.tools?.map((tool: any) => ({
              ...tool,
              due_date: dayjs(tool?.due_date).format('MMM DD'),
            })),
          })),
        }),
      );
      return {
        ...state,
        tools: {
          ...state.tools,
          projects: newData,
        },
      };
    }

    case `${GET_TODO_TASKS_BY_ROOM_ID}${ActionSuffix.SUCCESS}`: {
      const newProjects = state.todo.projects.map(project => {
        project.rooms = project.rooms.map(room => {
          if (room.id == action.meta.previousAction.payload.room_id) {
            room = {...room, ...action.payload.data};
            room.results.map(item => {
              item.due_date = dayjs(item?.due_date).format('MMM DD');
              return item;
            });
            return room;
          }
          return room;
        });
        return project;
      });
      return {...state, todo: {...state.todo, projects: newProjects}};
    }
    case HARD_LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};

// todo
export const getTodoProjects = (state: Record<string, BriefsState>) =>
  state[STATE_KEY]?.todo?.projects;
export const getIsLoadingTodoProjects = (state: Record<string, BriefsState>) =>
  state[STATE_KEY]?.todo?.loading;
export const getCurrentProgress = (state: Record<string, BriefsState>) =>
  state[STATE_KEY]?.todo?.progress;

// materials
export const getMaterialsProjects = (state: Record<string, BriefsState>) =>
  state[STATE_KEY]?.materials?.projects;
export const getIsLoadingMaterialsProjects = (
  state: Record<string, BriefsState>,
) => state[STATE_KEY]?.materials?.loading;

// tools
export const getToolsProjects = (state: Record<string, BriefsState>) =>
  state[STATE_KEY]?.tools?.projects;
export const getIsLoadingToolsProjects = (state: Record<string, BriefsState>) =>
  state[STATE_KEY]?.tools?.loading;

// tasks
// export const getTasksByRoomID = (state: Record<string, BriefsState>) => state[STATE_KEY]?.tools?.projects
// export const getIsLoadingTasks = (state: Record<string, BriefsState>) => state[STATE_KEY]?.tools?.loading

export default BriefsReducer;
