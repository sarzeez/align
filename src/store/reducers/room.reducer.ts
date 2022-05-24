import {AnyAction} from 'redux';
import {HARD_LOGOUT} from 'store/actions/auth.actions';
import {
  ADD_ROOM_PHOTO,
  CLEAR_PHOTOS,
  CREATE_MARKER,
  CREATE_ROOM,
  DELETE_ROOM_PHOTO,
  EDIT_ROOM,
  GET_ROOM,
  GET_ROOMS,
  SET_TAB_INDEX,
  SET_TARGET_PHOTO_INDEX,
  UPDATE_ROOM_PHOTO,
  UPDATE_MARKER,
  MARKER_ADDED,
} from 'store/actions/room.actions';
import {ActionSuffix} from 'store/models';
import {File} from 'typings/types.common';
import {Marker, RoomState} from './types';

export const STATE_KEY = 'room';

const initialState: RoomState = {
  isLoading: false,
  error: '',
  tabIndex: 0,
  targetPhotoIndex: null,
  currentRoom: null,
  photos: {
    '360': [],
    static: [],
  },
  rooms: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  markerAdded: false,
};

const RoomReducer = (state: RoomState = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_ROOM_PHOTO: {
      return {
        ...state,
        photos: {
          ...state.photos,
          [action.payload.type]: action.payload.replace
            ? action.payload.data
            : [
                ...(state.photos as any)[action.payload.type],
                ...action.payload.data,
              ],
        },
      };
    }
    case UPDATE_ROOM_PHOTO: {
      return {
        ...state,
        photos: {
          ...state.photos,
          [action.payload.type]: (state.photos as any)[action.payload.type].map(
            (item: File, i: number) =>
              i === action.payload.index ? action.payload.photo : item,
          ),
        },
      };
    }
    case SET_TARGET_PHOTO_INDEX: {
      return {
        ...state,
        targetPhotoIndex: action.payload,
      };
    }
    case CLEAR_PHOTOS: {
      return {
        ...state,
        // currentRoom: null, // WHY do WE need to set null here ????
        photos: {
          ...state.photos,
          '360': [],
          static: [],
        },
      };
    }
    case SET_TAB_INDEX: {
      return {
        ...state,
        tabIndex: action.payload,
      };
    }
    case DELETE_ROOM_PHOTO: {
      return {
        ...state,
        photos: {
          ...state.photos,
          [action.payload.type]: (state.photos as any)[
            action.payload.type
          ].filter((_item: any, i: number) => action.payload.index !== i),
        },
      };
    }
    case CREATE_ROOM:
    case GET_ROOMS:
    case GET_ROOM:
    case EDIT_ROOM:
    case CREATE_MARKER: {
      return {
        ...state,
        isLoading: true,
        error: '',
        markerAdded: false,
      };
    }
    case `${CREATE_ROOM}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        isLoading: false,
        error: '',
        rooms: {
          ...state.rooms,
          results: [
            ...state.rooms.results,
            {
              id: action.payload.data.id,
              name: action.payload.data.name,
              is_archived: false,
              markers: [],
            },
          ],
        },
      };
    }
    case `${GET_ROOMS}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        isLoading: false,
        error: '',
        rooms: {
          ...state.rooms,
          ...action.payload.data,
        },
      };
    }
    case `${GET_ROOM}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        isLoading: false,
        error: '',
        currentRoom: action.payload.data,
      };
    }
    case `${CREATE_MARKER}${ActionSuffix.SUCCESS}`: {
      const payload = action.payload.data;

      // TODO : it's a big trick, please refactor it 🤮
      const path: string = action.meta.previousAction.payload.request.url;
      const parts = path.split('/');
      const paramIndex = parts.findIndex(p => p === 'room_images');
      const imageId = Number(parts[paramIndex + 1]);

      let newMarkes: Marker[] = [];

      const room = state.rooms.results.find(r => r.id === payload.room_id);

      if (room && room.images) {
        const image = room.images.find(im => im.id === imageId);

        if (image) {
          newMarkes = [...image.markers, payload];
        }
      }

      return {
        ...state,
        markerAdded: true,
        isLoading: false,
        error: '',
        rooms:
          newMarkes.length > 0
            ? {
                ...state.rooms,
                results: state.rooms.results.map(r => {
                  return r.id !== payload.room_id
                    ? r
                    : {
                        ...r,
                        images: r.images.map(image => {
                          return image.id !== imageId
                            ? image
                            : {
                                ...image,
                                markers: newMarkes,
                              };
                        }),
                      };
                }),
              }
            : state.rooms,
        currentRoom: {
          ...state.currentRoom,
          images: state.currentRoom?.images.map(image => {
            return image.id !== imageId
              ? image
              : {
                  ...image,
                  markers: [...image.markers, payload],
                };
          }),
        },
      };
    }
    case `${UPDATE_MARKER}${ActionSuffix.SUCCESS}`: {
      const payload = action.payload;
      const metaPayload = action.meta.previousAction.payload;
      return {
        ...state,
      };
    }
    case `${CREATE_ROOM}${ActionSuffix.FAIL}`:
    case `${GET_ROOMS}${ActionSuffix.FAIL}`:
    case `${GET_ROOM}${ActionSuffix.FAIL}`:
    case `${EDIT_ROOM}${ActionSuffix.FAIL}`:
    case `${CREATE_MARKER}${ActionSuffix.FAIL}`: {
      return {
        ...state,
        isLoading: false,
        error: action.error.message,
        markerAdded: false,
      };
    }
    case `${UPDATE_MARKER}${ActionSuffix.FAIL}`: {
      const payload = action.payload;
      const metaPayload = action.meta.previousAction.payload;
      return {
        ...state,
        isLoading: false,
        error: action.error.message,
      };
    }
    case HARD_LOGOUT: {
      return initialState;
    }
    case MARKER_ADDED: {
      return {
        ...state,
        markerAdded: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export const getRoomIsLoadingSelector = (
  state: Record<any, RoomState>,
): RoomState['isLoading'] => state[STATE_KEY].isLoading;

export const getRoomErrorSelector = (
  state: Record<any, RoomState>,
): RoomState['error'] => state[STATE_KEY].error;

export const getRoomTabIndexSelector = (
  state: Record<any, RoomState>,
): RoomState['tabIndex'] => state[STATE_KEY].tabIndex;

export const getRoomPhotosSelector = (
  state: Record<any, RoomState>,
): RoomState['photos'] => state[STATE_KEY].photos;

export const getRoomsSelector = (
  state: Record<any, RoomState>,
): RoomState['rooms'] => state[STATE_KEY].rooms;

export const getCurrentRoomSelector = (
  state: Record<any, RoomState>,
): RoomState['currentRoom'] => state[STATE_KEY].currentRoom;

export const getTargetPhotoIndexSelector = (
  state: Record<any, RoomState>,
): RoomState['targetPhotoIndex'] => state[STATE_KEY].targetPhotoIndex;

export const markerAddedSelector = (
  state: Record<any, RoomState>,
): RoomState['markerAdded'] => state[STATE_KEY].markerAdded;

export default RoomReducer;
