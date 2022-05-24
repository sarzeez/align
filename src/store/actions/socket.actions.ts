import {AnyAction} from 'redux';

const namespace = 'SOCKET';

export const CONNECT = `${namespace}/CONNECT`;
export const DISCONNECT = `${namespace}/DISCONNECT`;
export const SET_ERROR = `${namespace}/SET_ERROR`;

export const connect = (): AnyAction => ({
  type: CONNECT,
});

export const disconnect = (): AnyAction => ({
  type: DISCONNECT,
});

export const setError = (err: string): AnyAction => ({
  type: SET_ERROR,
  payload: err,
});
