import {AnyAction} from 'redux';
import {HARD_LOGOUT} from 'store/actions/auth.actions';
import {GET_TODAYS_BRIEF} from 'store/actions/homepage.actions';
import {ActionSuffix} from 'store/models';
import {HomePageState} from './types';

export const STATE_KEY = 'homepage';

const initialState: HomePageState = {
  todaysBrief: [],
};

const HomePageReducer = (
  state: HomePageState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case `${GET_TODAYS_BRIEF}${ActionSuffix.SUCCESS}`:
      return {
        ...state,
        todaysBrief: action.payload.data.today_brief,
      };
    case HARD_LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export const todaysBrief = (
  state: Record<string, HomePageState>,
): HomePageState['todaysBrief'] => state[STATE_KEY].todaysBrief;

export default HomePageReducer;
