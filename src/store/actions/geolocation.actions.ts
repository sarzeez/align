import {AnyAction} from 'redux';
import {GeolocationState, SharedLocationUser} from 'store/reducers/types';
import {Method} from 'store/models';

const namespace = 'COMMUNITY';

const endpoint = '/users/location';

export const SET_CURRENT_LOCATION = `${namespace}/SET_CURRENT_LOCATION`;
export const START_SHARE_LOCATION = `${namespace}/START_SHARE_LOCATION`;
export const UPDATE_LOCATION = `${namespace}/UPDATE_LOCATION`;
export const STOP_SHARE_LOCATION = `${namespace}/STOP_SHARE_LOCATION`;
export const GET_SHARED_LOCATION_USERS = `${namespace}/GET_SHARED_LOCATION_USERS`;
export const START_REQUEST_HELP = `${namespace}/START_REQUEST_HELP`;
export const STOP_REQUEST_HELP = `${namespace}/STOP_REQUEST_HELP`;
export const SELECT_MARKER = `${namespace}/SELECT_MARKER`;
export const HIDE_CALLOUTS = `${namespace}/HIDE_CALLOUTS`;
export const REACT_TO_HELP = `${namespace}/REACT_TO_HELP`;
export const CANCEL_REACT_TO_HELP = `${namespace}/CANCEL_REACT_TO_HELP`;
export const UPDATE_SHARED_LOCATION_USERS = `${namespace}/UPDATE_SHARED_LOCATION_USERS`;

export const setCurrentLocation = (
  position: Partial<GeolocationState['currentLocation']>,
): AnyAction => ({
  type: SET_CURRENT_LOCATION,
  payload: position,
});

export const startShareLocation = ({
  latitude,
  longitude,
}: Partial<GeolocationState['currentLocation']>): AnyAction => ({
  type: START_SHARE_LOCATION,
  payload: {
    request: {
      data: {
        current_position: {
          latitude,
          longitude,
        },
      },
      method: Method.POST,
      url: `${endpoint}/update-position/`,
    },
  },
});

export const updateLocation = ({
  latitude,
  longitude,
}: Partial<GeolocationState['currentLocation']>): AnyAction => ({
  type: UPDATE_LOCATION,
  payload: {
    request: {
      data: {
        current_position: {
          latitude,
          longitude,
        },
      },
      method: Method.POST,
      url: `${endpoint}/update-position/`,
    },
  },
});

export const stopShareLocation = (): AnyAction => ({
  type: STOP_SHARE_LOCATION,
  payload: {
    request: {
      method: Method.POST,
      url: `${endpoint}/stop-sharing/`,
    },
  },
});

export const getSharedLocationUsers = ({
  latitude,
  longitude,
}: Partial<GeolocationState['currentLocation']>): AnyAction => ({
  type: GET_SHARED_LOCATION_USERS,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}/map-locations/?latitude=${latitude}&longitude=${longitude}`,
    },
  },
});

export const startRequestHelp = ({
  latitude,
  longitude,
}: Partial<GeolocationState['currentLocation']>): AnyAction => ({
  type: START_REQUEST_HELP,
  payload: {
    request: {
      data: {
        current_position: {
          latitude,
          longitude,
        },
      },
      method: Method.POST,
      url: `${endpoint}/request-help/start/`,
    },
  },
});

export const stopRequestHelp = (): AnyAction => ({
  type: STOP_REQUEST_HELP,
  payload: {
    request: {
      method: Method.POST,
      url: `${endpoint}/request-help/stop/`,
    },
  },
});

export const reactToHelp = ({userId}: {userId: number}): AnyAction => ({
  type: REACT_TO_HELP,
  payload: {
    userId,
    request: {
      method: Method.POST,
      url: `${endpoint}/request-help/${userId}/react/`,
    },
  },
});

export const cancelReactToHelp = ({userId}: {userId: number}): AnyAction => ({
  type: CANCEL_REACT_TO_HELP,
  payload: {
    userId,
    request: {
      method: Method.POST,
      url: `${endpoint}/request-help/${userId}/stop-react/`,
    },
  },
});

export const selectMarker = (id: number | null) => ({
  type: SELECT_MARKER,
  payload: {id},
});

export const hideCallouts = (value: boolean) => ({
  type: HIDE_CALLOUTS,
  payload: value,
});

export const updateSharedLocationUsers = (users: SharedLocationUser[]) => ({
  type: UPDATE_SHARED_LOCATION_USERS,
  payload: users,
});
