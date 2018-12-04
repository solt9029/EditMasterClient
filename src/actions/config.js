import { required, number, validate, maxLength } from '../utils/validations';
import { fetchSongBeat } from '../utils/http';
import { ActionTypes } from '../constants/';
import { createAction } from 'redux-actions';

const createPayloadWithValidation = rules => value => {
  const errors = validate(value, rules);
  return { value, errors };
};

export const setUsername = createAction(
  ActionTypes.CONFIG.SET_USERNAME,
  createPayloadWithValidation([required, maxLength(20)])
);

export const setVideoId = createAction(
  ActionTypes.CONFIG.SET_VIDEO_ID,
  createPayloadWithValidation([required])
);

export const setBpm = createAction(
  ActionTypes.CONFIG.SET_BPM,
  createPayloadWithValidation([required, number])
);

export const setOffset = createAction(
  ActionTypes.CONFIG.SET_OFFSET,
  createPayloadWithValidation([required, number])
);

export const setSpeed = createAction(
  ActionTypes.CONFIG.SET_SPEED,
  createPayloadWithValidation([required, number])
);

export const setComment = createAction(
  ActionTypes.CONFIG.SET_COMMENT,
  createPayloadWithValidation([maxLength(140)])
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
