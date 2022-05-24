import {AnyAction} from 'redux';
import {HARD_LOGOUT} from 'store/actions/auth.actions';
import {CONNECT, DISCONNECT} from 'store/actions/socket.actions';
import {SocketState} from './types';

export const STATE_KEY = 'socket';

const initialState: SocketState = {
  socket: null,
  connected: false,
  error: '',
};

const SirenReducer = (state: SocketState = initialState, action: AnyAction) => {
  switch (action.type) {
    case CONNECT: {
      return {
        ...state,
        connected: true,
      };
    }

    case DISCONNECT: {
      return {
        ...state,
        connected: false,
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

export const getSocketConnectedSelector = (
  state: Record<string, SocketState>,
): SocketState['connected'] => state[STATE_KEY].connected;

export const getSocketErrorSelector = (
  state: Record<string, SocketState>,
): SocketState['error'] => state[STATE_KEY].error;

export default SirenReducer;
