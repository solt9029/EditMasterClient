import { ActionTypes } from '../constants';

const initialState = {
  data: [],
  currentPage: 0,
  lastPage: 0,
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SCORE_CARD_PAGINATE.START_REQUEST:
      return {
        ...initialState,
        isLoading: true,
        error: null,
      };
    case ActionTypes.SCORE_CARD_PAGINATE.FINISH_REQUEST_SUCCESS:
      const { data, currentPage, lastPage } = action.payload;
      return {
        ...state,
        data,
        currentPage,
        lastPage,
        isLoading: false,
        error: null,
      };
    case ActionTypes.SCORE_CARD_PAGINATE.FINISH_REQUEST_ERROR:
      const { error } = action.payload;
      return {
        ...state,
        isLoading: false,
        error,
      };
    case ActionTypes.SCORE_CARD_PAGINATE.RESET:
      return initialState;
    default:
      return state;
  }
};
