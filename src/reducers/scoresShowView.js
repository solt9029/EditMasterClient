import { actionTypes } from '../constants/';

const initialState = {
  error: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SCORES_SHOW_VIEW.START_REQUEST:
      return {
        ...initialState,
        isLoading: true,
      };
    case actionTypes.SCORES_SHOW_VIEW.FINISH_REQUEST_ERROR:
      const { error } = action.payload;
      return {
        ...state,
        isLoading: false,
        error,
      };
    case actionTypes.SCORES_SHOW_VIEW.FINISH_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};
