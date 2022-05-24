import {AnyAction} from 'redux';
import {Method} from '../models';
import qs from 'query-string';
const endpoint = '/chats/';

const namespace = 'MESSAGES';

export const GET_MESSAGES_ROOM = `${namespace}/GET_MESSAGES_ROOM`;
export const SEARCH_MESSAGES_ROOM = `${namespace}/SEARCH_MESSAGES_ROOM`;
export const GET_MESSAGES = `${namespace}/GET_MESSAGES`;
export const DELETE_CHAT = `${namespace}/DELETE_CHAT`;
export const CREATE_NEW_CHAT = `${namespace}/CREATE_NEW_CHAT`;
export const SEND_MESSAGE = `${namespace}/SEND_MESSAGE`;
export const DELETE_MESSAGES = `${namespace}/DELETE_MESSAGES`;
export const CLEAR_MESSAGES = `${namespace}/CLEAR_MESSAGES`;

export const getChatRooms = (workspaceId?: number): AnyAction => {
  const params = new URLSearchParams();
  params.append('workspace_id', String(workspaceId));
  return {
    type: GET_MESSAGES_ROOM,
    payload: {
      request: {
        method: Method.GET,
        url: `${endpoint}`,
        params,
      },
    },
  };
};

export const deleteChat = (id: number): AnyAction => ({
  type: DELETE_CHAT,
  payload: {
    request: {
      method: Method.DELETE,
      url: `${endpoint}${id}/`,
    },
  },
});

export const deleteMessages = (
  chatId: number,
  messagesIds: number[],
): AnyAction => {
  const stringified = messagesIds.reduce((acc, next) => {
    return (acc += `messages=${next}&`);
  }, '?');
  return {
    type: DELETE_MESSAGES,
    payload: {
      request: {
        method: Method.DELETE,
        url: `${endpoint}messages/${chatId}/${stringified}/`,
      },
    },
  };
};

export const searchChats = ({
  search,
  limit,
  offset,
  workspaceId,
}: {
  search?: string;
  limit?: number;
  offset?: number;
  workspaceId?: number;
}) => {
  return {
    type: SEARCH_MESSAGES_ROOM,
    payload: {
      request: {
        method: Method.GET,
        url: `${endpoint}message/?${qs.stringify({
          workspace_id: workspaceId,
          search,
        })}`,
      },
    },
  };
};

export const createNewChat = (
  userId: number,
  workspace?: number,
): AnyAction => ({
  type: CREATE_NEW_CHAT,
  payload: {
    request: {
      data: {to_user: userId, workspace},
      method: Method.POST,
      url: `${endpoint}`,
    },
  },
});

export const sendMessage = (chatId: number, formData?: any): AnyAction => {
  return {
    type: SEND_MESSAGE,
    payload: {
      request: {
        headers: {'Content-Type': 'multipart/form-data'},
        responseType: 'json',
        data: formData,
        method: Method.POST,
        url: `${endpoint}messages/${chatId}`,
      },
    },
  };
};

export const getMessages = (id?: number): AnyAction => ({
  type: GET_MESSAGES,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}messages/${id}/`,
    },
  },
});

export const clearMessages = (): AnyAction => ({
  type: CLEAR_MESSAGES,
  payload: {
    data: {
      results: [],
    },
  },
});
