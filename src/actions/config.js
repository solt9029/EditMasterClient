import { calcSecondsPerNote } from './player';
import { defaultNotes } from '../reducers/editor';
import { defaultConfig } from '../reducers/config';
import constants from '../constants';
import { replaceNotes } from './editor';
import { replaceStates } from './player';

export const setDefaultScore = () => {
  return dispatch => {
    dispatch(replaceNotes(defaultNotes));
    let states = Array(defaultNotes.length).fill(constants.id.note.space);
    dispatch(replaceStates(states));

    dispatch(setConfig(defaultConfig));
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
    errors.push('必須項目です');
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
  let errors = [];
  if (value === '') {
    errors.push('必須項目です');
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
    errors.push('必須項目です');
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
    errors.push('必須項目です');
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
    errors.push('必須項目です');
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
  if (value === '') {
    errors.push('必須項目です');
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
