import { actionTypes } from '../constants/';
import * as utils from '../utils';

export const finishRequestError = error => ({
  type: actionTypes.SCORES_SHOW_VIEW.FINISH_REQUEST_ERROR,
  payload: { error },
});

export const startRequest = () => ({
  type: actionTypes.SCORES_SHOW_VIEW.START_REQUEST,
});

export const finishRequestSuccess = (notes, config) => ({
  type: actionTypes.SCORES_SHOW_VIEW.FINISH_REQUEST_SUCCESS,
  payload: {
    notes,
    config,
  },
});

export const reset = () => ({
  type: actionTypes.SCORES_SHOW_VIEW.RESET,
});

export const fetch = id => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      const result = await utils.http.getScore(id);
      const score = result.data;

      const notes = JSON.parse(score.notes);
      const { username, video_id, bpm, offset, speed, comment } = score;
      const config = {
        username,
        videoId: video_id,
        bpm,
        offset,
        speed,
        comment,
      };

      dispatch(finishRequestSuccess(notes, config));
    } catch (error) {
      dispatch(finishRequestError(error));
    }
  };
};
