import {AnyAction} from 'redux';
import qs from 'query-string';

import {Method} from 'store/models';
import {PostFilterType} from 'typings/types.common';

const namespace = 'COMMUNITY';

const endpoint = '/community';

export const GET_POSTS = `${namespace}/GET_POSTS`;
export const GET_OTHER_USER_POSTS = `${namespace}/GET_OTHER_USER_POSTS`;
export const CLEAR_OTHER_POSTS = `${namespace}/CLEAR_OTHER_POSTS`;
export const LOAD_MORE_POSTS = `${namespace}/LOAD_MORE_POSTS`;
export const LOAD_MORE_OTHER_POSTS = `${namespace}/LOAD_MORE_OTHER_POSTS`;
export const GET_COMMUNITIES = `${namespace}/GET_COMMUNITIES`;
export const GET_MY_ACCOUNTS = `${namespace}/GET_MY_ACCOUNTS`;
export const GET_MY_SCOREBOARD = `${namespace}/GET_MY_SCOREBOARD`;
export const LIKE_POST = `${namespace}/LIKE_POST`;
export const GET_TOP_SCORES = `${namespace}/GET_TOP_SCORES`;
export const DELETE_POST = `${namespace}/DELETE_POST`;
export const DELETE_ACCOUNTS = `${namespace}/DELETE_ACCOUNTS`;
export const CREATE_POST = `${namespace}/CREATE_POST`;
export const ADD_ACCOUNTS = `${namespace}/ADD_ACCOUNTS`;
export const VERIFY_ACCOUNT = `${namespace}/VERIFY_ACCOUNT`;
export const SEND_POINT_FROM_COMMUNITY = `${namespace}/SEND_POINT_FROM_COMMUNITY`;

export const getPosts = ({
  filter,
  search,
}: {
  filter: PostFilterType | number;
  type?: string;
  search?: string;
}): AnyAction => ({
  type: GET_POSTS,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}/posts/?${qs.stringify({
        ...(typeof filter === 'number' && {
          community: filter,
        }),
        ...(typeof filter !== 'number' &&
          filter === 'is_my' && {
            is_my: 'true',
          }),
        search,
      })}`,
    },
  },
});

export const getOtherPosts = ({
  filter,
  search,
}: {
  filter: PostFilterType | number;
  search?: string;
}): AnyAction => ({
  type: GET_OTHER_USER_POSTS,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}/posts/?${qs.stringify({
        author_id: filter,
        search,
      })}`,
    },
  },
});

export const loadMorePosts = ({next}: {next: string}): AnyAction => ({
  type: LOAD_MORE_POSTS,
  payload: {
    request: {
      method: Method.GET,
      url: next,
    },
  },
});

export const loadMoreOtherPosts = ({next}: {next: string}): AnyAction => ({
  type: LOAD_MORE_OTHER_POSTS,
  payload: {
    request: {
      method: Method.GET,
      url: next,
    },
  },
});

export const getCommunities = (): AnyAction => ({
  type: GET_COMMUNITIES,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}/`,
    },
  },
});

export const likePost = ({id}: {id: number}): AnyAction => ({
  type: LIKE_POST,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}/posts/${id}/toggle_like/`,
    },
  },
});

export const deletePost = ({id}: {id: number}): AnyAction => ({
  type: DELETE_POST,
  payload: {
    id,
    request: {
      method: Method.DELETE,
      url: `${endpoint}/posts/${id}/`,
    },
  },
});

export const createPost = (data: FormData): AnyAction => ({
  type: CREATE_POST,
  payload: {
    request: {
      data,
      method: Method.POST,
      url: `${endpoint}/posts/`,
    },
  },
});

export const getMyAccounts = (): AnyAction => ({
  type: GET_MY_ACCOUNTS,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}/accounts/`,
    },
  },
});

export const getMyScoreboard = (): AnyAction => ({
  type: GET_MY_SCOREBOARD,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}/score-board/my-score-board/`,
    },
  },
});
export const getTopScores = (): AnyAction => ({
  type: GET_TOP_SCORES,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}/score-board/top-score/`,
    },
  },
});

export const deleteAccount = ({id}: {id: number | null}): AnyAction => ({
  type: DELETE_ACCOUNTS,
  payload: {
    id,
    request: {
      method: Method.DELETE,
      url: `${endpoint}/accounts/${id}/`,
    },
  },
});

export const addAccounts = (email: string): AnyAction => ({
  type: ADD_ACCOUNTS,
  payload: {
    request: {
      data: {email},
      method: Method.POST,
      url: `${endpoint}/accounts/add_account/`,
    },
  },
});

export const verifyAccount = (data: {
  email: string;
  code: string;
}): AnyAction => ({
  type: VERIFY_ACCOUNT,
  payload: {
    request: {
      data,
      method: Method.POST,
      url: `${endpoint}/accounts/verify_account/`,
    },
  },
});

export const sendPointFromFeed = (id: number): AnyAction => ({
  type: SEND_POINT_FROM_COMMUNITY,
  payload: {
    request: {
      method: Method.GET,
      url: `${endpoint}/posts/${id}/send-points/`,
    },
  },
});

export const clearPosts = (): AnyAction => ({
  type: CLEAR_OTHER_POSTS,
});
