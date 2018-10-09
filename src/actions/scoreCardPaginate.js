import axios from 'axios';
import * as config from '../config/';
import { actionTypes } from '../constants/';

export const fetch = (page, keyword) => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      const { HOST, PORT } = config.api;
      const result = await axios.get(
        `http://${HOST}:${PORT}/scores?page=${page}&keyword=${keyword}`
      );
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
