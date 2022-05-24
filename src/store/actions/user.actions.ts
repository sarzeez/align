import {AnyAction} from 'redux';
import qs from 'query-string';
import {Method} from 'store/models';

import {
  EditProfile,
  ConfirmPasswordTypes,
  GeolocationState,
} from 'store/reducers/types';

const namespace = 'USER';

const endpoint = '/users/';

export const GET_USER = `${namespace}/GET_USER`;
export const GET_ALL_USERS = `${namespace}/GET_ALL_USERS`;
export const GET_OTHER_USER = `${namespace}/GET_OTHER_USER`;
export const EDIT_USER = `${namespace}/EDIT_USER`;
export const ADD_USER_DEVICES = `${namespace}/ADD_USER_DEVICES`;
export const DELETE_USER_DEVICES = `${namespace}/DELETE_USER_DEVICES`;
export const EDIT_USER_AVATAR = `${namespace}/EDIT_USER_AVATAR`;
export const CHECK_PASSWORD = `${namespace}/CHECK_PASSWORD`;
export const SEND_FEEDBACK = `${namespace}/SEND_FEEDBACK`;
export const CHANGE_USER_EMAIL = `${namespace}/CHANGE_USER_EMAIL`;
export const CONFIRM_CHANGE_USER_EMAIL = `${namespace}/CONFIRM_CHANGE_USER_EMAIL`;
export const CONFIRM_PASSWORD = `${namespace}/CONFIRM_PASSWORD`;
export const GET_INTERESTS = `${namespace}/GET_INTERESTS`;
export const SEND_POINTS = `${namespace}/SEND_POINTS`;
export const SET_EMERGENCY_CALL = `${namespace}/SET_EMERGENCY_CALL`;
export const STOP_EMERGENCY_CALL = `${namespace}/STOP_EMERGENCY_CALL`;
export const GET_MESSAGES_USER = `${namespace}/GET_MESSAGES_USER`;
export const SET_CURRENT_WORKSPACE = `${namespace}/SET_CURRENT_WORKSPACE`;

export const getUser = (): AnyAction => ({
  type: GET_USER,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}me/`,
    },
  },
});

export const getAllUsers = (): AnyAction => ({
  type: GET_ALL_USERS,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}`,
    },
  },
});

export const getOtherUser = (id: number): AnyAction => ({
  type: GET_OTHER_USER,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}profiles/${id}/`,
    },
  },
});

export const getMessagesUsers = (
  workspace_id: number | null,
  search?: string | null,
): AnyAction => {
  const params = new URLSearchParams();
  search && params.append('search', String(search));
  return {
    type: GET_MESSAGES_USER,
    payload: {
      request: {
        method: Method.GET,
        url: `${endpoint}?${qs.stringify({
          workspace_id,
          search,
        })}`,
      },
    },
  };
};

export const sendPoints = (id: number): AnyAction => ({
  type: SEND_POINTS,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}points/send-points/${id}/send_points/`,
    },
  },
});

export const editContractorProfile = (
  data: EditProfile,
  role: string,
): AnyAction => ({
  type: EDIT_USER,
  payload: {
    request: {
      data,
      method: Method.PUT,
      url: `${endpoint}contractor/`,
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
      },
    },
  },
});

export const changeUserEmail = (email: string): AnyAction => ({
  type: CHANGE_USER_EMAIL,
  payload: {
    request: {
      data: {email},
      method: Method.POST,
      url: `${endpoint}change-email/request/`,
    },
  },
});

export const confirmChangeUserEmail = ({
  email,
  code,
}: {
  email: string;
  code: string;
}): AnyAction => ({
  type: CONFIRM_CHANGE_USER_EMAIL,
  payload: {
    request: {
      data: {email, code},
      method: Method.POST,
      url: `${endpoint}change-email/confirm/`,
    },
  },
});

export const sendFeedback = ({
  title,
  body,
}: {
  title: string;
  body: string;
}): AnyAction => ({
  type: SEND_FEEDBACK,
  payload: {
    request: {
      data: {title, body},
      method: Method.POST,
      url: `${endpoint}send-feedback/`,
    },
  },
});

export const editUserAvatar = (data: FormData): AnyAction => ({
  type: EDIT_USER_AVATAR,
  payload: {
    request: {
      data,
      method: Method.POST,
      url: `${endpoint}user/avatar`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  },
});

export const checkPasswordForChanging = (
  current_password: string,
): AnyAction => ({
  type: CHECK_PASSWORD,
  payload: {
    request: {
      data: {current_password},
      method: Method.POST,
      url: `${endpoint}change-password/check_password/`,
    },
  },
});

export const confirmPasswordForChanging = (
  data: ConfirmPasswordTypes,
): AnyAction => ({
  type: CONFIRM_PASSWORD,
  payload: {
    request: {
      data,
      method: Method.POST,
      url: `${endpoint}change-password/confirm/`,
    },
  },
});

export const getListOfInterests = (): AnyAction => ({
  type: GET_INTERESTS,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}interests`,
    },
  },
});

export const addUserDevices = (data: {
  device_type: string;
  uid: string;
}): AnyAction => ({
  type: ADD_USER_DEVICES,
  payload: {
    request: {
      data,
      method: Method.POST,
      url: `${endpoint}devices/`,
    },
  },
});

export const deleteUserDevices = (id: string): AnyAction => ({
  type: DELETE_USER_DEVICES,
  payload: {
    request: {
      method: Method.DELETE,
      url: `${endpoint}devices/${id}/`,
    },
  },
});

export const setEmergencyCall = ({
  latitude,
  longitude,
}: Partial<GeolocationState['currentLocation']>): AnyAction => ({
  type: SET_EMERGENCY_CALL,
  payload: {
    request: {
      data: {
        current_position: {
          latitude,
          longitude,
        },
      },
      method: Method.POST,
      url: `${endpoint}location/emergency-call/`,
    },
  },
});

export const stopEmergencyCall = (): AnyAction => ({
  type: STOP_EMERGENCY_CALL,
  payload: {
    request: {
      method: Method.POST,
      url: `${endpoint}location/emergency-call-stop/`,
    },
  },
});
