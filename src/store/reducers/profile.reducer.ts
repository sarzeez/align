import * as R from 'ramda';
import {AnyAction} from 'redux';

import {HARD_LOGOUT, LOGOUT} from 'store/actions/auth.actions';
import {
  CANCEL_REACT_TO_HELP,
  REACT_TO_HELP,
  START_REQUEST_HELP,
  START_SHARE_LOCATION,
  STOP_REQUEST_HELP,
  STOP_SHARE_LOCATION,
} from 'store/actions/geolocation.actions';
import {
  GET_USER,
  GET_INTERESTS,
  EDIT_USER,
  EDIT_USER_AVATAR,
  CONFIRM_CHANGE_USER_EMAIL,
  GET_OTHER_USER,
  GET_MESSAGES_USER,
} from 'store/actions/user.actions';
import {ProfileState, UserProfile} from 'store/reducers/types';
import {ActionSuffix} from '../models';

export const STATE_KEY = 'profile';
const initialState: ProfileState = {
  userProfile: null,
  otherUserProfile: null,
  interests: [],
  messagesUsers: [],
};

const ProfileReducer = (
  state: ProfileState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case `${CONFIRM_CHANGE_USER_EMAIL}${ActionSuffix.SUCCESS}`:
    case `${GET_USER}${ActionSuffix.SUCCESS}`: {
      const userProfile = action.payload.data;
      return R.assoc('userProfile', userProfile, state);
    }
    case `${GET_OTHER_USER}${ActionSuffix.SUCCESS}`: {
      const otherUserProfile = action.payload.data;
      return R.assoc('otherUserProfile', otherUserProfile, state);
    }
    case `${GET_MESSAGES_USER}${ActionSuffix.SUCCESS}`: {
      const messagesUsers = action.payload.data.results;
      return R.assoc('messagesUsers', messagesUsers, state);
    }
    case `${EDIT_USER_AVATAR}${ActionSuffix.SUCCESS}`: {
      const userProfile = action.payload.data;
      return R.assoc('userProfile', userProfile, state);
    }
    case `${GET_INTERESTS}${ActionSuffix.SUCCESS}`: {
      const interests = action.payload.data.interests;
      return R.assoc('interests', interests, state);
    }
    case `${START_SHARE_LOCATION}${ActionSuffix.SUCCESS}`: {
      const userProfile = {...state.userProfile, is_sharing_location: true};
      return R.assoc('userProfile', userProfile, state);
    }
    case `${STOP_SHARE_LOCATION}${ActionSuffix.SUCCESS}`: {
      const userProfile = {...state.userProfile, is_sharing_location: false};
      return R.assoc('userProfile', userProfile, state);
    }
    case `${START_REQUEST_HELP}${ActionSuffix.SUCCESS}`: {
      const userProfile = {
        ...state.userProfile,
        is_help_required: true,
        is_sharing_location: true,
      };
      return R.assoc('userProfile', userProfile, state);
    }
    case `${STOP_REQUEST_HELP}${ActionSuffix.SUCCESS}`: {
      const userProfile = {
        ...state.userProfile,
        is_help_required: false,
      };
      return R.assoc('userProfile', userProfile, state);
    }
    case `${REACT_TO_HELP}${ActionSuffix.SUCCESS}`: {
      const userProfile = {
        ...state.userProfile,
        is_reacted_to_help: true,
      };
      return R.assoc('userProfile', userProfile, state);
    }
    case `${CANCEL_REACT_TO_HELP}${ActionSuffix.SUCCESS}`: {
      const userProfile = {
        ...state.userProfile,
        is_reacted_to_help: false,
      };
      return R.assoc('userProfile', userProfile, state);
    }
    case `${LOGOUT}${ActionSuffix.SUCCESS}`:
    case HARD_LOGOUT: {
      return initialState;
    }
    case HARD_LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export const getProfile = (state: Record<string, any>): UserProfile =>
  state[STATE_KEY].userProfile;

export const getOtherProfileSelector = (
  state: Record<string, any>,
): UserProfile => state[STATE_KEY].otherUserProfile;

export const getInterestsList = (state: Record<string, any>): UserProfile =>
  state[STATE_KEY].interests;

export const getMessagesUsersSelector = (
  state: Record<string, any>,
): UserProfile => state[STATE_KEY].messagesUsers;

export default ProfileReducer;
