import axios from 'axios';
import systemConfig from '../config';

export const finishRequestError = error => ({
  type: 'SHOW/FINISH_REQUEST_ERROR',
  payload: { error },
});

export const startRequest = () => ({
  type: 'SHOW/START_REQUEST',
});

export const finishRequestSuccess = (notes, config) => ({
  type: 'SHOW/FINISH_REQUEST_SUCCESS',
  payload: {
    notes,
    config,
  },
});

export const reset = () => ({
  type: 'SHOW/RESET',
});

export const fetch = id => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      const result = await axios.get(
        `http://${systemConfig.api.host}:${systemConfig.api.port}/scores/${id}`
      );
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
