import { setNotes } from './editor';
import axios from 'axios';
import config from '../config';
import { notFound } from './show';
import urlParse from 'url-parse';

export const fetchScore = id => {
  return async dispatch => {
    try {
      const result = await axios.get(
        `http://${config.api.host}:${config.api.port}/scores/${id}`
      );
      const score = result.data;

      const notes = JSON.parse(score.notes);
      dispatch(setNotes(notes));

      const { username, video_id, bpm, offset, speed, comment } = score;
      dispatch(setUsername(username, false));
      dispatch(setVideoId(video_id, false));
      dispatch(setBpm(bpm, false));
      dispatch(setOffset(offset, false));
      dispatch(setSpeed(speed, false));
      dispatch(setComment(comment ? comment : '', false));
    } catch (error) {
      dispatch(notFound());
    }
  };
};

export const reset = () => ({
  type: 'CONFIG/RESET',
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
    dispatch(setBpm(bpm, false));
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

export const setBpm = (value, touched = true) => {
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
