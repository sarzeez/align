import {AnyAction} from 'redux';

import {
  GET_MESSAGES_ROOM,
  SEARCH_MESSAGES_ROOM,
  GET_MESSAGES,
  CLEAR_MESSAGES,
} from 'store/actions/messages.actions';
import {MessagesState} from 'store/reducers/types';
import {ActionSuffix} from 'store/models';
import {HARD_LOGOUT} from 'store/actions/auth.actions';

export const STATE_KEY = 'messages';

// Mock data should be after real data

const initialState: MessagesState = {
  messagesRooms: [],
  singleChatMessages: [],
};

const AuthReducer = (
  state: MessagesState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case `${SEARCH_MESSAGES_ROOM}${ActionSuffix.SUCCESS}`:
    case `${GET_MESSAGES_ROOM}${ActionSuffix.SUCCESS}`: {
      return {
        ...state,
        messagesRooms: action.payload.data.results.sort((a, b) => {
          return new Date(b.last_message_date) - new Date(a.last_message_date);
        }),
      };
    }
    case CLEAR_MESSAGES:
    case `${GET_MESSAGES}${ActionSuffix.SUCCESS}`: {
      console.log(action);
      return {
        ...state,
        singleChatMessages: action.payload.data.results,
      };
    }

    case HARD_LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export const getMessagesRoomSelector = (state: Record<string, any>): string =>
  state[STATE_KEY].messagesRooms;

export const getSingleChatMessagesSelector = (
  state: Record<string, any>,
): string => state[STATE_KEY].singleChatMessages;

export default AuthReducer;
