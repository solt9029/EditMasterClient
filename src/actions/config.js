import { required, number, validate, maxLength } from '../utils/validations';
import { fetchSongBeat } from '../utils/http';
import { ActionTypes } from '../constants/';
import { createAction } from 'redux-actions';

export const reset = () => ({
  type: ActionTypes.CONFIG.RESET,
});

const maxLength20 = maxLength(20);
const maxLength140 = maxLength(140);

export const setUsername = createAction(
  ActionTypes.CONFIG.SET_USERNAME,
  value => {
    const errors = validate(value, [required, maxLength20]);
    return { value, errors };
  }
);

export const setVideoId = createAction(
  ActionTypes.CONFIG.SET_VIDEO_ID,
  value => {
    const errors = validate(value, [required]);
    return { value, errors };
  }
);

export const setBpm = createAction(ActionTypes.CONFIG.SET_BPM, value => {
  const errors = validate(value, [required, number]);
  return { value, errors };
});

export const setOffset = createAction(ActionTypes.CONFIG.SET_OFFSET, value => {
  const errors = validate(value, [required, number]);
  return { value, errors };
});

export const setSpeed = createAction(ActionTypes.CONFIG.SET_SPEED, value => {
  const errors = validate(value, [required, number]);
  return { value, errors };
});

export const setComment = createAction(
  ActionTypes.CONFIG.SET_COMMENT,
  value => {
    const errors = validate(value, [maxLength140]);
    return { value, errors };
  }
);

export const fetchSongle = videoId => {
  return async dispatch => {
    try {
      const result = await fetchSongBeat(videoId);
      if (!result.data.beats) {
        return;
      }

      const offset = result.data.beats[0].start / 1000;
      dispatch(setOffset(offset, false));

      let bpmSum = 0;
      for (let i = 30; i < result.data.beats.length - 30; i++) {
        bpmSum += result.data.beats[i].bpm;
      }
      const bpm = bpmSum / (result.data.beats.length - 60);
      dispatch(setBpm(bpm, false));
    } catch (error) {
      // error handling
    }
  };
};
