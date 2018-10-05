import axios from 'axios';
import urlParse from 'url-parse';
import constants from '../constants';

export const reset = () => ({
  type: 'CONFIG/RESET',
});

const { required, number, validate, maxLength } = constants.validation;
const maxLength20 = maxLength(20);
const maxLength140 = maxLength(140);

export const setUsername = (value, touched = true) => {
  const errors = validate(value, [required, maxLength20]);
  return {
    type: 'SET_USERNAME',
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
    type: 'SET_VIDEO_ID',
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
    type: 'SET_BPM',
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
    type: 'SET_OFFSET',
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
    type: 'SET_SPEED',
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
    type: 'SET_COMMENT',
    payload: {
      value,
      errors,
      touched,
    },
  };
};

export const setVideoIdAndFetchSongle = (value, touched = true) => {
  return async dispatch => {
    // format url to videoId
    const url = urlParse(value, true);
    if (url.query.v) {
      value = url.query.v;
    }

    dispatch(setVideoId(value, touched));

    // songle
    const result = await axios.get(
      `http://widget.songle.jp/api/v1/song/beat.json?url=www.youtube.com/watch?v=${value}`
    );
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
  };
};
