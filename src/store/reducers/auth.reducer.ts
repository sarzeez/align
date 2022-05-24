import * as R from 'ramda';
import {AnyAction} from 'redux';
import {typesOfAccount} from 'typings/types.common';
import {DeviceState} from 'react-native-onesignal';

import {
  SET_TOKEN,
  LOGOUT,
  DELETE_USER,
  LATER_FILL_PROFILE,
  SOCIAL_AUTH,
  SET_APP_LOADING,
  HARD_LOGOUT,
  ONESIGNAL_DEVICE_STATE,
  GET_USER_SETTINGS,
  CHANGE_USER_SETTINGS,
  CONTRACTOR_REGISTER_GET_TOKEN,
  GET_MY_PROFILE,
  SET_IS_AUTH,
  DELETE_TEMPORARY_TOKENS,
  SHOW_SUCCESS_MODAL,
  CONTINUE_WITHOUT_PIN
} from 'store/actions/auth.actions';
import {AuthState} from 'store/reducers/types';
import {ActionSuffix} from 'store/models';

export const STATE_KEY = 'auth';

const initialState: AuthState = {
  token: null,
  refresh: null,
  isAuth: false,
  isLoading: false,
  error: '',
  signCount: 0,
  signDate: null,
  isAppLoading: false,
  isLaterFillProfile: false,
  notificationsEnabled: true,
  temporaryRefresh: null,
  temporaryToken: null,
  accountType: null,
  deviceState: null,
  showSuccessModal: false,
  continueWithoutPin: false,
};

const AuthReducer = (state: AuthState = initialState, action: AnyAction) => {
  switch (action.type) {
    case CONTINUE_WITHOUT_PIN: {
      return {...state, continueWithoutPin: action.payload}; //deviceState: state.deviceState,
    }
    case `${SET_TOKEN}${ActionSuffix.SUCCESS}`:
    case `${SOCIAL_AUTH}${ActionSuffix.SUCCESS}`: {

      const token = action.payload.data?.access;
      const refresh = action.payload.data?.refresh;
      const signCount = state.signCount;
      const signDate = new Date();

      return {
        ...state,
        token,
        signDate,
        refresh,
        isAuth: true,
        signCount: signCount + 1,
      };
    }
    // case `${LOGOUT}${ActionSuffix.SUCCESS}`: {

    // }
    case HARD_LOGOUT: {
      const signCount = state.signCount >= 3 ? 0 : state.signCount;
      return {...initialState, signCount}; //deviceState: state.deviceState,
    }
    // case `${DELETE_USER}${ActionSuffix.SUCCESS}`: {
    //   const signCount = 0;
    //   return {...initialState, signCount, deviceState: state.deviceState};
    // }
    case `${CONTRACTOR_REGISTER_GET_TOKEN}${ActionSuffix.SUCCESS}`: {
      return {
        ...initialState,
        temporaryToken: action.payload.data.access,
        temporaryRefresh: action.payload.data.refresh,
      };
    }
    case DELETE_TEMPORARY_TOKENS: {
      return {
        ...initialState,
        temporaryToken: null,
        temporaryRefresh: null,
      };
    }
    case LATER_FILL_PROFILE: {
      const isLaterFillProfile = true;

      return R.assoc('isLaterFillProfile', isLaterFillProfile, state);
    }
    case SET_APP_LOADING: {
      const isAppLoading = action.payload.data;

      return R.assoc('isAppLoading', isAppLoading, state);
    }
    case ONESIGNAL_DEVICE_STATE: {
      const deviceState = action.payload.deviceState;

      return R.assoc('deviceState', deviceState, state);
    }
    case `${GET_USER_SETTINGS}${ActionSuffix.SUCCESS}`: {
      const notificationsEnabled = action.payload.data.notifications_enabled;

      return R.assoc('notificationsEnabled', notificationsEnabled, state);
    }
    case `${CHANGE_USER_SETTINGS}${ActionSuffix.SUCCESS}`: {
      const notificationsEnabled = action.payload.data.notifications_enabled;

      return R.assoc('notificationsEnabled', notificationsEnabled, state);
    }
    case `${GET_MY_PROFILE}${ActionSuffix.SUCCESS}`: {
      const accountType = action.payload.data.contractor
        ? typesOfAccount.contractor
        : typesOfAccount.subContractor;

      return R.assoc('accountType', accountType, state);
    }
    case SET_IS_AUTH: {
      return {
        ...state,
        isAuth: action.payload,
      };
    }
    case SHOW_SUCCESS_MODAL: {
      return {
        ...state,
        showSuccessModal: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const getContinueWithoutPin = (state: Record<string, any>): string =>
  state[STATE_KEY].continueWithoutPin;

export const getToken = (state: Record<string, any>): string =>
  state[STATE_KEY].token;

export const getTemporaryToken = (state: Record<string, any>): string =>
  state[STATE_KEY].temporaryToken;

export const getTemporaryRefresh = (state: Record<string, any>): string =>
  state[STATE_KEY].temporaryRefresh;

export const getRefreshToken = (state: Record<string, any>): string =>
  state[STATE_KEY].refresh;

export const getIsAuthenticated = (state: Record<string, any>): boolean =>
  state[STATE_KEY].isAuth;

export const isLogin = (state: Record<string, any>): boolean =>
  state[STATE_KEY].tokenLogin;

export const getSignInDate = (state: Record<string, any>): Date =>
  state[STATE_KEY].signDate;

export const getSignInCount = (state: Record<string, any>): number =>
  state[STATE_KEY].signCount;

export const getLaterFillProfile = (state: Record<string, any>): boolean =>
  state[STATE_KEY].isLaterFillProfile;

export const getNotificationStatus = (state: Record<string, any>): boolean =>
  state[STATE_KEY].notificationsEnabled;

export const getIsAppLoading = (state: Record<string, any>): boolean =>
  state[STATE_KEY].isAppLoading;

export const getAccountType = (
  state: Record<string, any>,
): typesOfAccount | null => state[STATE_KEY].accountType;

export const getDeviceState = (state: Record<string, any>): DeviceState =>
  state[STATE_KEY].deviceState;

export const showSuccessModalSelector = (
  state: Record<string, any>,
): AuthState['showSuccessModal'] => state[STATE_KEY].showSuccessModal;

export default AuthReducer;
