import { actionTypes } from '../constants/';

export const setKeyword = keyword => ({
  type: actionTypes.NAVBAR.SET_KEYWORD,
  payload: {
    keyword,
  },
});
