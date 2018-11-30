import { ActionTypes } from '../constants';
import { fetchScores } from '../utils/http';

export const fetch = (page, keyword) => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      const result = await fetchScores(page, keyword);
      const { current_page, last_page, data } = result.data;
      dispatch(finishRequestSuccess(data, current_page, last_page));
    } catch (error) {
      dispatch(finishRequestError(error));
    }
  };
};

export const startRequest = () => ({
  type: ActionTypes.SCORE_CARD_PAGINATE.START_REQUEST,
});

export const finishRequestSuccess = (data, currentPage, lastPage) => ({
  type: ActionTypes.SCORE_CARD_PAGINATE.FINISH_REQUEST_SUCCESS,
  payload: {
    data,
    currentPage,
    lastPage,
  },
});

export const finishRequestError = error => ({
  type: ActionTypes.SCORE_CARD_PAGINATE.FINISH_REQUEST_ERROR,
  payload: {
    error,
  },
});

export const reset = () => ({
  type: ActionTypes.SCORE_CARD_PAGINATE.RESET,
});
