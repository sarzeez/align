import {AnyAction} from 'redux';
import {Method} from '../models';

const namespace = 'HOMEPAGE';
const endpoint = '/home_page/';

export const GET_TODAYS_BRIEF = `${namespace}/GET_TODAYS_BRIEF`;

export const getTodaysBrief = (id?: number): AnyAction => ({
  type: GET_TODAYS_BRIEF,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}todays_brief/?workspace_id=${id}`,
    },
  },
});
