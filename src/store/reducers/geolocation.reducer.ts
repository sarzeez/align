import {AnyAction} from 'redux';

import {GeolocationState, SharedLocationUser} from 'store/reducers/types';

import {
  CANCEL_REACT_TO_HELP,
  GET_SHARED_LOCATION_USERS,
  HIDE_CALLOUTS,
  REACT_TO_HELP,
  SELECT_MARKER,
  SET_CURRENT_LOCATION,
  START_REQUEST_HELP,
  START_SHARE_LOCATION,
  STOP_REQUEST_HELP,
  STOP_SHARE_LOCATION,
  UPDATE_SHARED_LOCATION_USERS,
} from 'store/actions/geolocation.actions';
import {ActionSuffix} from 'store/models';
import {HARD_LOGOUT} from 'store/actions/auth.actions';

export const STATE_KEY = 'geolocation';

const initialState: GeolocationState = {
  currentLocation: {},
  sharedLocationUsers: [],
  selectedMarkerId: null,
  hideCallouts: false,
  isLoading: false,
  error: '',
};

const GeolocationReducer = (
  state: GeolocationState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case SET_CURRENT_LOCATION: {
      return {
        ...state,
        currentLocation: {
          ...state.currentLocation,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          latitudeDelta: action.payload.latitudeDelta,
          longitudeDelta: action.payload.longitudeDelta,
        },
      };
    }

    case START_SHARE_LOCATION:
    case STOP_SHARE_LOCATION:
    case START_REQUEST_HELP:
    case STOP_REQUEST_HELP:
    case REACT_TO_HELP:
    case CANCEL_REACT_TO_HELP: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case SELECT_MARKER: {
      return {
        ...state,
        selectedMarkerId: action.payload.id,
      };
    }

    case HIDE_CALLOUTS: {
      return {
        ...state,
        hideCallouts: action.payload,
      };
    }

    case `${START_SHARE_LOCATION}${ActionSuffix.SUCCESS}`:
    case `${STOP_SHARE_LOCATION}${ActionSuffix.SUCCESS}`:
    case `${START_REQUEST_HELP}${ActionSuffix.SUCCESS}`:
    case `${STOP_REQUEST_HELP}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case `${GET_SHARED_LOCATION_USERS}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        sharedLocationUsers: action.payload.data,
      };
    }

    case `${REACT_TO_HELP}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        isLoading: false,
        sharedLocationUsers: state.sharedLocationUsers.map(item =>
          item.id === action.meta.previousAction.payload.userId
            ? {
                ...item,
                is_assisting: true,
              }
            : item,
        ),
      };
    }

    case `${CANCEL_REACT_TO_HELP}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        isLoading: false,
        sharedLocationUsers: state.sharedLocationUsers.map(item =>
          item.id === action.meta.previousAction.payload.userId
            ? {
                ...item,
                is_assisting: false,
              }
            : item,
        ),
      };
    }

    case UPDATE_SHARED_LOCATION_USERS: {
      return {
        ...state,
        sharedLocationUsers: state.sharedLocationUsers.map(m => {
          const updatedMember: SharedLocationUser = action.payload?.find(
            (nm: {id: number}) => nm.id === m.id,
          );

          if (updatedMember) {
            return {
              ...m,
              ...updatedMember,
              current_position: {
                ...m.current_position,
                ...updatedMember.current_position,
              },
            };
          } else {
            return m;
          }
        }),
      };
    }

    case `${START_SHARE_LOCATION}${ActionSuffix.FAIL}`:
    case `${STOP_SHARE_LOCATION}${ActionSuffix.FAIL}`:
    case `${START_REQUEST_HELP}${ActionSuffix.FAIL}`:
    case `${STOP_REQUEST_HELP}${ActionSuffix.FAIL}`:
    case `${REACT_TO_HELP}${ActionSuffix.FAIL}`: {
      return {
        ...state,
        isLoading: false,
        error: action.error.message,
      };
    }
    case HARD_LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export const getShareIsLoadingSelector = (
  state: Record<string, GeolocationState>,
): GeolocationState['isLoading'] => state[STATE_KEY].isLoading;

export const getCurrentLocationSelector = (
  state: Record<string, GeolocationState>,
): GeolocationState['currentLocation'] => state[STATE_KEY].currentLocation;

export const getSharedLocationUsersSelector = (
  state: Record<string, GeolocationState>,
): GeolocationState['sharedLocationUsers'] =>
  state[STATE_KEY].sharedLocationUsers;

export const getReactedToHelpUsersSelector = (
  state: Record<string, GeolocationState>,
): GeolocationState['sharedLocationUsers'] =>
  state[STATE_KEY].sharedLocationUsers.filter(item => item.is_reacted_to_help);

export const getSelectedMarkerSelector = (
  state: Record<string, GeolocationState>,
): SharedLocationUser | undefined =>
  state[STATE_KEY].sharedLocationUsers?.find(
    item => state[STATE_KEY].selectedMarkerId === item.id,
  );

export const hideCalloutsSelector = (
  state: Record<string, GeolocationState>,
): GeolocationState['hideCallouts'] => state[STATE_KEY].hideCallouts;

export default GeolocationReducer;
