import {AnyAction} from 'redux';
import {Method} from 'store/models';

const namespace = 'NOTIFICATION';
const endpoint = 'api/v1/notifications/';
export const GET_NOTIFICATIONS_LIST = `${namespace}/GET_NOTIFICATIONS_LIST`;

/**
 *
 * @param limit - max number of items in one response (25)
 * @param offset - requested position of first item in whole list (0, 25, 50 ...)
 * @returns
 */
export const getNotificationHistory = (
  limit: number,
  offset: number,
): AnyAction => ({
  type: GET_NOTIFICATIONS_LIST,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}list?limit=${limit}&offset${offset}`,
    },
  },
});
