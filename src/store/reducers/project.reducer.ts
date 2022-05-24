import {AnyAction} from 'redux';
import {HARD_LOGOUT} from 'store/actions/auth.actions';
import {
  SELECTED_PROJECT_ITEM,
  ARCHIVE_PROJECT,
  CREATE_PROJECT,
  DELETE_PROJECT,
  GET_PROJECTS,
  UPDATE_PROJECT,
  GET_TRADES,
  GET_PROJECT_DETAIL,
  GET_SINGLE_TASK,
  TOGGLE_ASSIGNEES_MODAL,
  GET_SINGLE_MATERIAL,
  GET_SINGLE_TOOL,
} from 'store/actions/projects.actions';
import {ActionSuffix} from 'store/models';
import {ProjectState} from './types';

export const STATE_KEY = 'project';

const initialState: ProjectState = {
  isLoading: false,
  error: '',
  selectedProject: {
    id: 0,
    name: '',
    address: '',
    state: '',
    zip_code: '',
    workspace: 0,
  },
  projects: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  projectDetails: {},
  tradesList: [],
  singleTask: {},
  singleMaterial: {},
  singleTool: {},
  toggleAssigneesModal: false,
};

const AccessReducer = (
  state: ProjectState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case SELECTED_PROJECT_ITEM: {
      return {
        ...state,
        selectedProject: action.payload,
      };
    }
    case CREATE_PROJECT:
    case UPDATE_PROJECT: {
      return {
        ...state,
        error: '',
      };
    }
    case `${CREATE_PROJECT}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        projects: {
          ...state.projects,
          results: [...state.projects.results, action.payload.data],
        },
      };
    }
    case `${UPDATE_PROJECT}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        projects: {
          ...state.projects,
          results: state.projects.results.map(item =>
            item.id === action.payload.data.id ? action.payload.data : item,
          ),
        },
      };
    }
    case `${DELETE_PROJECT}${ActionSuffix.SUCCESS}`:
    case `${ARCHIVE_PROJECT}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        projects: {
          ...state.projects,
          results: state.projects.results.filter(
            item => action.meta.previousAction.payload.id !== item.id,
          ),
        },
      };
    }
    case GET_PROJECTS: {
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    }
    case `${GET_PROJECTS}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        error: '',
        isLoading: false,
        projects: {
          ...state.projects,
          ...action.payload.data,
        },
      };
    }
    case TOGGLE_ASSIGNEES_MODAL: {
      return {
        ...state,
        toggleAssigneesModal: action.payload,
      };
    }
    case `${GET_TRADES}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        tradesList: [...action.payload.data.results],
      };
    }
    case `${GET_PROJECT_DETAIL}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        projectDetails: action.payload.data,
      };
    }
    case `${GET_SINGLE_TASK}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        singleTask: action.payload.data,
      };
    }
    case `${GET_SINGLE_MATERIAL}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        singleMaterial: action.payload.data,
      };
    }
    case `${GET_SINGLE_TOOL}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        singleTool: action.payload.data,
      };
    }
    case `${GET_PROJECTS}${ActionSuffix.FAIL}`:
    case `${CREATE_PROJECT}${ActionSuffix.FAIL}`:
    case `${UPDATE_PROJECT}${ActionSuffix.FAIL}`: {
      return {
        ...state,
        isLoading: true,
        error: action.error.message,
      };
    }
    case HARD_LOGOUT: {
      return initialState;
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export const getSelectedProject = (
  state: Record<string, ProjectState>,
): ProjectState['selectedProject'] => state[STATE_KEY].selectedProject;

export const getProjectsSelector = (
  state: Record<string, ProjectState>,
): ProjectState['projects']['results'] => state[STATE_KEY].projects.results;

export const getTradesListSelector = (
  state: Record<string, ProjectState>,
): ProjectState['tradesList'] => state[STATE_KEY].tradesList;

export const getProjectDetailsSelector = (
  state: Record<string, ProjectState>,
): ProjectState['projectDetails'] => state[STATE_KEY].projectDetails;

export const getSingleTaskSelector = (
  state: Record<string, ProjectState>,
): ProjectState['singleTask'] => state[STATE_KEY].singleTask;

export const getSingleMaterialSelector = (
  state: Record<string, ProjectState>,
): ProjectState['singleMaterial'] => state[STATE_KEY].singleMaterial;

export const getSingleToolSelector = (
  state: Record<string, ProjectState>,
): ProjectState['singleTool'] => state[STATE_KEY].singleTool;

export const getIsLoadingProjectsSelector = (
  state: Record<string, ProjectState>,
): ProjectState['isLoading'] => state[STATE_KEY].isLoading;

export const getToggleAssigneesModal = (
  state: Record<string, ProjectState>,
): ProjectState['toggleAssigneesModal'] =>
  state[STATE_KEY].toggleAssigneesModal;

export default AccessReducer;
