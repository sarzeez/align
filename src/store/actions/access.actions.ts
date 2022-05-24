import {AnyAction} from 'redux';

const namespace = 'ACCESS';

export const ADD_ACCESS = `${namespace}/ADD_ACCESS`;

export const addAccess = (key: string): AnyAction => ({
  type: ADD_ACCESS,
  payload: key,
});
