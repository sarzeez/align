import {AnyAction} from 'redux';

export type AsyncDispatch = (action: AnyAction) => Promise<any>;

export enum Method {
  PATCH = 'PATCH',
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ActionSuffix {
  SUCCESS = '_SUCCESS',
  FAIL = '_FAIL',
}

export interface AxiosPayloadRequest {
  method: Method;
  url: string;
  headers?: Record<string, string>;
  data?: any;
}

export interface AxiosPayload {
  request: AxiosPayloadRequest;
}

export interface AxiosAction {
  error?: any;
  meta?: any;
  type: string;
  payload: AxiosPayload;
}
