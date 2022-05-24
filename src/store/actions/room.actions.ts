import {AnyAction} from 'redux';
import {Method} from 'store/models';
import {File} from 'typings/types.common';

const namespace = 'ROOM';

export const ADD_ROOM_PHOTO = `${namespace}/ADD_ROOM_PHOTO`;
export const CLEAR_PHOTOS = `${namespace}/CLEAR_PHOTOS`;
export const DELETE_ROOM_PHOTO = `${namespace}/DELETE_ROOM_PHOTO`;
export const UPDATE_ROOM_PHOTO = `${namespace}/UPDATE_ROOM_PHOTO`;
export const CREATE_ROOM = `${namespace}/CREATE_ROOM`;
export const GET_ROOMS = `${namespace}/GET_ROOMS`;
export const GET_ROOM = `${namespace}/GET_ROOM`;
export const SET_TAB_INDEX = `${namespace}/SET_TAB_INDEX`;
export const SET_TARGET_PHOTO_INDEX = `${namespace}/SET_TARGET_PHOTO_INDEX`;
export const EDIT_ROOM = `${namespace}/EDIT_ROOM`;
export const GET_MARKERS = `${namespace}/GET_MARKERS`;
export const CREATE_MARKER = `${namespace}/CREATE_MARKER`;
export const UPDATE_MARKER = `${namespace}/UPDATE_MARKER`;
export const DELETE_MARKER = `${namespace}/DELETE_MARKER`;
export const MARKER_ADDED = `${namespace}/MARKER_ADDED`;

export const addRoomPhoto = (data: {
  type: '360' | 'static';
  replace?: boolean;
  data: File[] | [];
}): AnyAction => ({
  type: ADD_ROOM_PHOTO,
  payload: data,
});

export const updateRoomPhoto = (data: {
  index: number;
  type: '360' | 'static';
  photo: File;
}): AnyAction => ({
  type: UPDATE_ROOM_PHOTO,
  payload: data,
});

export const setTargetPhotoIndex = (index: number | null): AnyAction => ({
  type: SET_TARGET_PHOTO_INDEX,
  payload: index,
});

export const clearPhotos = (): AnyAction => ({
  type: CLEAR_PHOTOS,
});

export const deleteRoomPhoto = (data: {
  type: '360' | 'static';
  index: number;
}): AnyAction => ({
  type: DELETE_ROOM_PHOTO,
  payload: data,
});

export const getRooms = ({projectId}: {projectId: number}): AnyAction => ({
  type: GET_ROOMS,
  payload: {
    request: {
      method: Method.GET,
      url: `/projects/${projectId}/rooms/`,
    },
  },
});

export const getRoom = ({
  projectId,
  roomId,
}: {
  projectId: number;
  roomId: number;
}): AnyAction => ({
  type: GET_ROOM,
  payload: {
    request: {
      method: Method.GET,
      url: `/projects/${projectId}/rooms/${roomId}/`,
    },
  },
});

export const setTabIndex = (index: number): AnyAction => ({
  type: SET_TAB_INDEX,
  payload: index,
});

export const editRoom = ({
  projectId,
  roomId,
  data,
}: {
  projectId: number;
  roomId: number;
  data: {name: string};
}): AnyAction => ({
  type: EDIT_ROOM,
  payload: {
    request: {
      method: Method.PATCH,
      data,
      url: `/projects/${projectId}/rooms/${roomId}/`,
    },
  },
});

export const getMarkers = ({
  projectId,
  roomId,
  imageId,
}: {
  projectId: number;
  roomId: number;
  imageId: number;
}): AnyAction => ({
  type: GET_MARKERS,
  payload: {
    request: {
      method: Method.GET,
      url: `/projects/${projectId}/rooms/${roomId}/room_images/${imageId}/markers/`,
    },
  },
});

export const createMarker = ({
  projectId,
  roomId,
  imageId,
  x,
  y,
}: {
  projectId: number;
  roomId: number;
  imageId: number;
  x: number;
  y: number;
}): AnyAction => ({
  type: CREATE_MARKER,
  payload: {
    request: {
      data: {
        x,
        y,
        z: -1,
      },
      method: Method.POST,
      url: `/projects/${projectId}/rooms/${roomId}/room_images/${imageId}/markers/`,
    },
  },
});

export const updateMarker = ({
  id,
  projectId,
  roomId,
  imageId,
  data,
}: {
  id: number;
  projectId: number;
  roomId: number;
  imageId: number;
  data: {
    x: number;
    y: number;
    punchListItemId: number;
  };
}): AnyAction => ({
  type: UPDATE_MARKER,
  payload: {
    request: {
      data: {
        x: data.x,
        y: data.y,
        z: -1,
        punchlist_id: data.punchListItemId,
      },
      method: Method.PATCH,
      url: `/projects/${projectId}/rooms/${roomId}/room_images/${imageId}/markers/${id}/`,
    },
  },
});

export const deleteMarker = ({
  id,
  projectId,
  roomId,
  imageId,
}: {
  id: number;
  projectId: number;
  roomId: number;
  imageId: number;
}): AnyAction => ({
  type: UPDATE_MARKER,
  payload: {
    request: {
      method: Method.DELETE,
      url: `/projects/${projectId}/rooms/${roomId}/room_images/${imageId}/markers/${id}`,
    },
  },
});

export const setMarkerAdded = (added: boolean): AnyAction => ({
  type: MARKER_ADDED,
  payload: added,
});
