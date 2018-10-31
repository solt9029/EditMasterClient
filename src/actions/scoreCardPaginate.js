import { actionTypes } from '../constants/';
import * as utils from '../utils';

export const fetch = (page, keyword) => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      const result = await utils.http.getScores(page, keyword);
      dispatch(finishRequestSuccess(result.data));
    } catch (error) {
      dispatch(finishRequestError(error));
    }
  };
};

export const startRequest = () => ({
  type: actionTypes.SCORE_CARD_PAGINATE.START_REQUEST,
});

export const finishRequestSuccess = data => ({
  type: actionTypes.SCORE_CARD_PAGINATE.FINISH_REQUEST_SUCCESS,
  payload: { data },
});

export const finishRequestError = error => ({
  type: actionTypes.SCORE_CARD_PAGINATE.FINISH_REQUEST_ERROR,
  payload: { error },
});

export const reset = () => ({
  type: actionTypes.SCORE_CARD_PAGINATE.RESET,
});
