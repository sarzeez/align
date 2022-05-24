import {AnyAction} from 'redux';
import {ADD_ACCESS} from 'store/actions/access.actions';
import {PermissionsStatuses} from 'typings/types.common';
import {AccessState} from './types';

export const STATE_KEY = 'accesses';

const initialState: AccessState = {
  location: '',
  camera: '',
  photos: '',
  addPhotos: '',
  microphone: '',
  documents: '',
  showInfoBox: false,
};

const AccessReducer = (
  state: AccessState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case ADD_ACCESS: {
      return {
        ...state,
        [action.payload]: PermissionsStatuses.granted,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export const getAccessSelector = (
  state: Record<string, AccessState>,
): AccessState => state[STATE_KEY];

export default AccessReducer;
