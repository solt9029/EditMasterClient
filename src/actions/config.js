import { required, number, validate, maxLength } from '../utils/validations';
import { getSongle } from '../utils/http';
import { actionTypes } from '../constants/';

export const reset = () => ({
  type: actionTypes.CONFIG.RESET,
});

const maxLength20 = maxLength(20);
const maxLength140 = maxLength(140);

export const setUsername = (value, touched = true) => {
  const errors = validate(value, [required, maxLength20]);
  return {
    type: actionTypes.CONFIG.SET_USERNAME,
    payload: {
      value,
      errors,
      touched,
    },
  };
};

export const setVideoId = (value, touched = true) => {
  const errors = validate(value, [required]);
  return {
    type: actionTypes.CONFIG.SET_VIDEO_ID,
    payload: {
      value,
      errors,
      touched,
    },
  };
};

export const setBpm = (value, touched = true) => {
  const errors = validate(value, [required, number]);
  return {
    type: actionTypes.CONFIG.SET_BPM,
    payload: {
      value,
      errors,
      touched,
    },
  };
};

export const setOffset = (value, touched = true) => {
  const errors = validate(value, [required, number]);
  return {
    type: actionTypes.CONFIG.SET_OFFSET,
    payload: {
      value,
      errors,
      touched,
    },
  };
};

export const setSpeed = (value, touched = true) => {
  const errors = validate(value, [required, number]);
  return {
    type: actionTypes.CONFIG.SET_SPEED,
    payload: {
      value,
      errors,
      touched,
    },
  };
};

export const setComment = (value, touched = true) => {
  const errors = validate(value, [maxLength140]);
  return {
    type: actionTypes.CONFIG.SET_COMMENT,
    payload: {
      value,
      errors,
      touched,
    },
  };
};

export const fetchSongle = videoId => {
  return async dispatch => {
    try {
      const result = await getSongle(videoId);
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
