import { calcSecondsPerNote } from './player';
import { defaultNotes } from '../reducers/editor';
import { defaultConfig } from '../reducers/config';
import { setNotes } from './editor';
import axios from 'axios';
import config from '../config';
import { notFound } from './show';
import urlParse from 'url-parse';

export const setDefaultScore = () => {
  return dispatch => {
    dispatch(setNotes(defaultNotes));

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
      dispatch(setNotes(notes));

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
    dispatch(setBpmAndCalcSecondsPerNote(bpm, false));
  };
};

export const setVideoId = (value, touched = true) => {
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
