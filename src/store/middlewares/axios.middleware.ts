import axios from 'axios';
import axiosMiddlewareFactory from 'redux-axios-middleware';

import appConfig from 'config/appConfig';
import {hardLogout, refreshToken, logout} from 'store/actions/auth.actions';
import {
  getToken,
  getTemporaryToken,
  getDeviceState,
  getRefreshToken,
} from 'store/reducers/auth.reducer';
import {expiredTokenErrorMessages} from 'typings/types.common';
import {ActionSuffix} from '../models';

const axiosClient = axios.create({
  baseURL: appConfig.baseUrl,
  responseType: 'json',
});

const axiosMiddlewareOptions = {
  interceptors: {
    request: [
      ({getState}: any, request: any) => {
        const state = getState();
        const token = getToken(state);
        const temporaryToken = getTemporaryToken(state);

        if (token) {
          request.headers.Authorization = `JWT ${token}`;
        }
        if (temporaryToken) {
          request.headers.Authorization = `JWT ${temporaryToken}`;
        }

        return request;
      },
    ],
    response: [
      {
        success: (_: any, response: any) => {
          return Promise.resolve(response);
        },
        error: async (store: any, error: any) => {
          const {dispatch, getState} = store;
          const state = getState();
          const refresh = getRefreshToken(state);
          const deviceState = getDeviceState(store.getState());
          const errorStatus = error?.response?.data?.detail;
          if (
            errorStatus === expiredTokenErrorMessages.notAuthenticated ||
            errorStatus === expiredTokenErrorMessages.notValidToken ||
            errorStatus === expiredTokenErrorMessages.tokenExpired ||
            errorStatus === expiredTokenErrorMessages.unexpectedToken ||
            errorStatus === expiredTokenErrorMessages.notProvideCredentials /*||
            errorStatus === expiredTokenErrorMessages.tokenBlacklisted*/
          ) {
            const resp = await dispatch(refreshToken(refresh));
            if (resp.type.includes(ActionSuffix.FAIL)) {
              dispatch(logout(deviceState.pushToken));
              dispatch(hardLogout());
            }
            return;
          }
          return Promise.reject(error);
        },
      },
    ],
  },
};

const axiosMiddleware = axiosMiddlewareFactory(
  axiosClient,
  axiosMiddlewareOptions,
);

export default axiosMiddleware;
