import qs from 'query-string';
import {AnyAction} from 'redux';
import {Method} from 'store/models';

const namespace = 'SHARED_PREFERENCES';

const endpoint = '/users/location';

export const GET_COMMUNITIES = `${namespace}/GET_COMMUNITIES`;
export const GET_MEMBERS = `${namespace}/GET_MEMBERS`;
export const TOGGLE_COMMUNITY = `${namespace}/TOGGLE_COMMUNITY`;
export const TOGGLE_MEMBER = `${namespace}/TOGGLE_MEMBER`;
export const LOAD_MORE_MEMBERS = `${namespace}/LOAD_MORE_MEMBERS`;

export const getCommunities = ({search}: {search?: string}): AnyAction => ({
  type: GET_COMMUNITIES,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}/sharing-settings/communities/?${qs.stringify({
        search,
      })}`,
    },
  },
});

export const getMembers = ({search}: {search?: string}): AnyAction => ({
  type: GET_MEMBERS,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}/sharing-settings/members/?${qs.stringify({
        search,
      })}`,
    },
  },
});

export const loadMoreMembers = ({next}: {next: string}): AnyAction => ({
  type: LOAD_MORE_MEMBERS,
  payload: {
    request: {
      method: Method.GET,
      url: next,
    },
  },
});

export const toggleCommunity = (id: number): AnyAction => ({
  type: TOGGLE_COMMUNITY,
  payload: {
    request: {
      method: Method.POST,
      url: `${endpoint}/sharing-settings/communities/toggle-community/`,
      data: {
        community: id,
      },
    },
  },
});

export const toggleMember = (id: number): AnyAction => ({
  type: TOGGLE_MEMBER,
  payload: {
    request: {
      method: Method.POST,
      url: `${endpoint}/sharing-settings/members/toggle-user/`,
      data: {
        user: id,
      },
    },
  },
});
