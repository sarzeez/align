import {AnyAction} from 'redux';
import {ContactUsData} from 'store/reducers/types';
import {Method} from 'store/models';

const namespace = 'MENU';

const endpoint = 'api/v1/';

export const GET_FAQ = `${namespace}/GET_FAQ`;
export const CONTACT_US = `${namespace}/CONTACT_US`;

export const getFaq = (): AnyAction => ({
  type: GET_FAQ,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}faq`,
    },
  },
});

export const contactUs = (contactUsData: ContactUsData): AnyAction => ({
  type: CONTACT_US,
  payload: {
    request: {
      method: Method.POST,
      url: `${endpoint}contactus/`,
      data: contactUsData,
    },
  },
});
