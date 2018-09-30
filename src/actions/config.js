import { calcSecondsPerNote } from './player';
import { defaultNotes } from '../reducers/editor';
import { defaultConfig } from '../reducers/config';
import constants from '../constants';
import { replaceNotes } from './editor';
import { replaceStates } from './player';
import axios from 'axios';
import config from '../config';
import { notFound } from './show';
import urlParse from 'url-parse';

export const setDefaultScore = () => {
  return dispatch => {
    dispatch(replaceNotes(defaultNotes));
    let states = Array(defaultNotes.length).fill(constants.id.note.space);
    dispatch(replaceStates(states));

    dispatch(setConfig(defaultConfig));
  };
};

export const fetchScore = id => {
  return async dispatch => {
    try {
      const result = await axios.get(
        `http://${config.api.host}:${config.api.port}/scores/${id}`
      );
      const score = result.data;

      const notes = JSON.parse(score.notes);
      dispatch(replaceNotes(notes));
      let states = Array(notes.length).fill(constants.id.note.space);
      dispatch(replaceStates(states));

      dispatch(
        setConfig({
          username: score.username,
          videoId: score.video_id,
          offset: score.offset,
          comment: score.comment,
          speed: score.speed,
          bpm: score.bpm,
        })
      );
    } catch (error) {
      dispatch(notFound());
    }
  };
};

export const setConfig = config => {
  return dispatch => {
    dispatch(setUsername(config.username, false));
    dispatch(setVideoId(config.videoId, false));
    dispatch(setBpmAndCalcSecondsPerNote(config.bpm, false));
    dispatch(setOffset(config.offset, false));
    dispatch(setSpeed(config.speed, false));
    dispatch(setComment(config.comment, false));
  };
};

export const resetConfig = () => ({
  type: 'RESET_CONFIG',
});

export const setUsername = (value, touched = true) => {
  let errors = [];
  if (value === '') {
    errors.push('必須です');
  }
  if (value.length > 20) {
    errors.push('20文字以下の文字列を指定してください');
  }
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
  // format url to videoId
  const url = urlParse(value, true);
  if (url.query.v) {
    value = url.query.v;
  }

  let errors = [];
  if (value === '') {
    errors.push('必須です');
  }
  return {
    type: 'SET_VIDEO_ID',
    payload: {
      value,
      errors,
      touched,
    },
  };
};

export const setBpmAndCalcSecondsPerNote = (value, touched = true) => {
  return dispatch => {
    dispatch(calcSecondsPerNote(value));
    dispatch(setBpm(value, touched));
  };
};

const setBpm = (value, touched = true) => {
  let errors = [];
  if (value === '') {
    errors.push('必須です');
  }
  if (isNaN(value)) {
    errors.push('数値を指定してください');
  }
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
  let errors = [];
  if (value === '') {
    errors.push('必須です');
  }
  if (isNaN(value)) {
    errors.push('数値を指定してください');
  }
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
  let errors = [];
  if (value === '') {
    errors.push('必須です');
  }
  if (isNaN(value)) {
    errors.push('数値を指定してください');
  }
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
  let errors = [];
  if (value.length > 140) {
    errors.push('140文字以下の文字列を指定してください');
  }
  return {
    type: 'SET_COMMENT',
    payload: {
      value,
      errors,
      touched,
    },
  };
};
