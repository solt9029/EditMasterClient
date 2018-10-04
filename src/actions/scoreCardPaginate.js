import axios from 'axios';
import config from '../config';

export const fetch = (page, keyword) => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      const result = await axios.get(
        `http://${config.api.host}:${
          config.api.port
        }/scores?page=${page}&keyword=${keyword}`
      );
      dispatch(finishRequestSuccess(result.data));
    } catch (error) {
      dispatch(finishRequestError(error));
    }
  };
};

export const startRequest = () => ({
  type: 'SCORE_CARD_PAGINATE/START_REQUEST',
});

export const finishRequestSuccess = data => ({
  type: 'SCORE_CARD_PAGINATE/FINISH_REQUEST_SUCCESS',
  payload: { data },
});

export const finishRequestError = error => ({
  type: 'SCORE_CARD_PAGINATE/FINISH_REQUEST_ERROR',
  payload: { error },
});

export const reset = () => ({
  type: 'SCORE_CARD_PAGINATE/RESET',
});
