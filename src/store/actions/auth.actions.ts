import {DeviceState} from 'react-native-onesignal';
import {AnyAction} from 'redux';
import {Method} from 'store/models';
import {SocialAuth, SocialAuthData, typesOfAccount} from 'typings/types.common';

import {
  RegisterBody,
  LoginBody,
  logoutBody,
  ResetPasswordBody,
  VerifyEmailBody,
  VerifyEmailValidateCodeBody,
  registerDeviceData,
} from './types';

const namespace = 'AUTH';
const endpoint = '/users/auth/';

export const CONTINUE_WITHOUT_PIN = `${namespace}/CONTINUE_WITHOUT_PIN`;
export const SET_TOKEN = `${namespace}/SET_TOKEN`;
export const SET_IS_AUTH = `${namespace}/SET_IS_AUTH `;
export const REGISTER = `${namespace}/REGISTER`;
export const CONTRACTOR_REGISTER = `${namespace}/CONTRACTOR_REGISTER`;
export const CONTRACTOR_REGISTER_GET_TOKEN = `${namespace}/CONTRACTOR_REGISTER_GET_TOKEN`;
export const SUB_CONTRACTOR_REGISTER = `${namespace}/SUB_CONTRACTOR_REGISTER`;
export const VERIFY_EMAIL = `${namespace}/VERIFY_EMAIL`;
export const RESEND_CODE = `${namespace}/RESEND_CODE`;
export const FORGOT_PASSWORD = `${namespace}/FORGOT_PASSWORD`;
export const RESET_PASSWORD = `${namespace}/RESET_PASSWORD`;
export const LOGOUT = `${namespace}/LOGOUT`;
export const DELETE_USER = `${namespace}/DELETE_USER`;
export const NOTIFICATIONS = `${namespace}/NOTIFICATIONS`;
export const LATER_FILL_PROFILE = `${namespace}/LATER_FILL_PROFILE`;
export const SOCIAL_AUTH = `${namespace}/SOCIAL_AUTH`;
export const SET_APP_LOADING = `${namespace}/SET_APP_LOADING`;
export const HARD_LOGOUT = `${namespace}/HARD_LOGOUT`;
export const LOGIN = `${namespace}/LOGIN`;
//ONE_SIGNAL
export const ONESIGNAL_DEVICE_STATE = `${namespace}/ONESIGNAL_DEVICE_STATE`;
export const GET_USER_SETTINGS = `${namespace}/GET_USER_SETTINGS`;
export const CHANGE_USER_SETTINGS = `${namespace}/CHANGE_USER_SETTINGS`;
export const GET_MY_PROFILE = `${namespace}/GET_MY_PROFILE`;
export const CHANGE_PASSWORD = `${namespace}/CHANGE_PASSWORD`;
export const DELETE_TEMPORARY_TOKENS = `${namespace}/DELETE_TEMPORARY_TOKENS`;
export const SHOW_SUCCESS_MODAL = `${namespace}/SHOW_SUCCESS_MODAL`;
export const REGISTER_DEVICE = `${namespace}/REGISTER_DEVICE`;

export const iDontHavePin = (payload: boolean): AnyAction => ({
  type: CONTINUE_WITHOUT_PIN,
  payload,
});

export const fetchLogin = (loginBody: LoginBody): AnyAction => ({
  type: SET_TOKEN,
  payload: {
    request: {
      data: loginBody,
      method: Method.POST,
      url: `${endpoint}login/`,
    },
  },
});

export const deleteTemporaryTokens = () => ({
  type: DELETE_TEMPORARY_TOKENS,
});

export const contractorRegister = (loginBody: LoginBody): AnyAction => ({
  type: CONTRACTOR_REGISTER_GET_TOKEN,
  payload: {
    request: {
      data: loginBody,
      method: Method.POST,
      url: `${endpoint}login/`,
    },
  },
});

export const registration = (
  registrationBody: RegisterBody,
  accountType: string,
): AnyAction => ({
  type: REGISTER,
  payload: {
    request: {
      method: Method.POST,
      data: registrationBody,
      url: `${endpoint}registration/${accountType}/`,
    },
  },
});

export const verifyEmail = (verifyEmailBody: VerifyEmailBody): AnyAction => ({
  type: SET_TOKEN,
  payload: {
    request: {
      method: Method.POST,
      data: verifyEmailBody,
      url: `${endpoint}verify-email/`,
    },
  },
});
export const verifyEmailValidateCode = (
  verifyEmailBody: VerifyEmailValidateCodeBody,
): AnyAction => ({
  type: VERIFY_EMAIL,
  payload: {
    request: {
      method: Method.POST,
      data: verifyEmailBody,
      url: `${endpoint}verify-email/validate-code/`,
    },
  },
});

export const forgotPasswordValidateCode = (
  verifyEmailBody: VerifyEmailValidateCodeBody,
): AnyAction => ({
  type: VERIFY_EMAIL,
  payload: {
    request: {
      method: Method.POST,
      data: verifyEmailBody,
      url: '/users/forgot_password/verify_pin/',
    },
  },
});

export const resendCode = (email: string): AnyAction => ({
  type: RESEND_CODE,
  payload: {
    request: {
      method: Method.POST,
      data: {email},
      url: `${endpoint}resend-code/`,
    },
  },
});

export const refreshToken = (refresh: string) => ({
  type: SET_TOKEN,
  payload: {
    request: {
      data: {refresh},
      method: Method.POST,
      url: `${endpoint}refresh/`,
    },
  },
});

export const fetchForgotPassword = (email: string): AnyAction => ({
  type: FORGOT_PASSWORD,
  payload: {
    request: {
      method: Method.POST,
      data: {email},
      url: '/users/forgot_password/send_pin/',
    },
  },
});

export const fetchResetPassword = (
  resetPassword: ResetPasswordBody,
): AnyAction => ({
  type: RESET_PASSWORD,
  payload: {
    request: {
      method: Method.POST,
      data: resetPassword,
      url: `${endpoint}forgot-password-confirm/`,
    },
  },
});

export const logout = ({access, refresh}: logoutBody): AnyAction => ({
  type: LOGOUT,
  payload: {
    request: {
      method: Method.POST,
      url: `${endpoint}logout/`,
      data: {
        refresh,
        access,
      },
    },
  },
});

export const hardLogout = (): AnyAction => ({
  type: HARD_LOGOUT,
});

export const deleteUser = (): AnyAction => ({
  type: DELETE_USER,
  payload: {
    request: {
      method: Method.DELETE,
      url: `${endpoint}user`,
    },
  },
});

export const socialAuth = ({
  data,
  provider,
}: {
  data: SocialAuthData;
  provider: SocialAuth.Google | SocialAuth.Apple;
}): AnyAction => ({
  type: SOCIAL_AUTH,
  payload: {
    request: {
      data,
      method: Method.POST,
      url: `api/v1/auth/${provider}/login`,
    },
  },
});

export const laterFillProfile = (): AnyAction => ({
  type: LATER_FILL_PROFILE,
});

export const setIsAuth = (auth: boolean): AnyAction => ({
  type: SET_IS_AUTH,
  payload: auth,
});

export const setAppLoading = (value: boolean): AnyAction => ({
  type: SET_APP_LOADING,
  payload: {
    data: value,
  },
});

export const setOneSignalDeviceState = (
  deviceState: DeviceState,
): AnyAction => ({
  type: ONESIGNAL_DEVICE_STATE,
  payload: {
    deviceState,
  },
});

export const getUserSettings = (): AnyAction => ({
  type: GET_USER_SETTINGS,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}user/settings`,
    },
  },
});

export const changePassword = (data: {
  password1: string;
  password2: string;
  old_password: string;
}): AnyAction => ({
  type: CHANGE_PASSWORD,
  payload: {
    request: {
      method: Method.POST,
      url: `${endpoint}reset_password/`,
      data,
    },
  },
});

export const changeUserSettings = (
  notifications_enabled: boolean,
): AnyAction => ({
  type: CHANGE_USER_SETTINGS,
  payload: {
    request: {
      method: Method.PUT,
      url: `${endpoint}user/settings`,
      data: {
        notifications_enabled,
      },
    },
  },
});

export const getMyProfile = (): AnyAction => ({
  type: GET_MY_PROFILE,
  payload: {
    request: {
      method: Method.GET,
      url: '/users/me/',
    },
  },
});

export const showSuccessModal = (payload: boolean) => ({
  type: SHOW_SUCCESS_MODAL,
  payload,
});

export const registerDevice = (data: registerDeviceData): AnyAction => ({
  type: REGISTER_DEVICE,
  payload: {
    request: {
      data,
      method: Method.POST,
      url: `/users/register_device/`,
    },
  },
});
