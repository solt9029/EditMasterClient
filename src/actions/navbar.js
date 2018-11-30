import { ActionTypes } from '../constants/';

export const setKeyword = keyword => ({
  type: ActionTypes.NAVBAR.SET_KEYWORD,
  payload: {
    keyword,
  },
});
