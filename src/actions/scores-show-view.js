import { ActionTypes } from '../constants';
import { fetchScore } from '../utils/http';

export const finishRequestError = error => ({
  type: ActionTypes.SCORES_SHOW_VIEW.FINISH_REQUEST_ERROR,
  payload: { error },
});

export const startRequest = () => ({
  type: ActionTypes.SCORES_SHOW_VIEW.START_REQUEST,
});

export const finishRequestSuccess = (notes, config) => ({
  type: ActionTypes.SCORES_SHOW_VIEW.FINISH_REQUEST_SUCCESS,
  payload: {
    notes,
    config,
  },
});

export const reset = () => ({
  type: ActionTypes.SCORES_SHOW_VIEW.RESET,
});

export const fetch = id => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      const result = await fetchScore(id);
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
