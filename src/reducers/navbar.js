import { actionTypes } from '../constants/';

const initialState = {
  keyword: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NAVBAR.SET_KEYWORD:
      return {
        ...state,
        keyword: action.payload.keyword,
      };
    default:
      return state;
  }
};