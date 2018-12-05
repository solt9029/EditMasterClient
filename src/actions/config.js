import { required, number, validate, maxLength } from '../utils/validations';
import { fetchSongle as _fetchSongle } from '../utils/http';
import { calcSongle } from '../utils/calculations';
import { ActionTypes } from '../constants/';
import { createAction } from 'redux-actions';

const createPayloadWithValidation = rules => value => {
  const errors = validate(value, rules);
  return { value, errors };
};

export const setUsername = createAction(
  ActionTypes.SET_USERNAME,
  createPayloadWithValidation([required, maxLength(20)])
);

export const setVideoId = createAction(
  ActionTypes.SET_VIDEO_ID,
  createPayloadWithValidation([required])
);

export const setBpm = createAction(
  ActionTypes.SET_BPM,
  createPayloadWithValidation([required, number])
);

export const setOffset = createAction(
  ActionTypes.SET_OFFSET,
  createPayloadWithValidation([required, number])
);

export const setSpeed = createAction(
  ActionTypes.SET_SPEED,
  createPayloadWithValidation([required, number])
);

export const setComment = createAction(
  ActionTypes.SET_COMMENT,
  createPayloadWithValidation([maxLength(140)])
);

export const finishFetchingSongle = createAction(
  ActionTypes.FINISH_FETCHING_SONGLE
);

export const fetchSongle = videoId => {
  return async dispatch => {
    try {
      const result = await _fetchSongle(videoId);
      if (!result.data.beats) {
        return;
      }
      const payload = calcSongle(result.data.beats);
      dispatch(finishFetchingSongle(payload));
    } catch (error) {
      // error handling
    }
  };
};
