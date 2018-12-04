import { ActionTypes } from '../constants/';
import { handleActions } from 'redux-actions';

const defaultState = {
  username: {
    value: '通りすがりの創作の達人',
    errors: [],
  },
  videoId: {
    value: 'jhOVibLEDhA',
    errors: [],
  },
  bpm: {
    value: 158,
    errors: [],
  },
  offset: {
    value: 0.75,
    errors: [],
  },
  comment: {
    value: '創作の達人で創作譜面をしました！',
    errors: [],
  },
  speed: {
    value: 1,
    errors: [],
  },
};

const initialState = {
  username: {
    value: '',
    errors: [],
  },
  videoId: {
    value: '',
    errors: [],
  },
  bpm: {
    value: 0,
    errors: [],
  },
  offset: {
    value: 0,
    errors: [],
  },
  comment: {
    value: '',
    errors: [],
  },
  speed: {
    value: 0,
    errors: [],
  },
};

/**
 *
 * @param {string} name
 * @return {function}
 */
const handleSetConfigFormAction = name => (state, action) => ({
  ...state,
  [name]: action.payload,
});

export default handleActions(
  {
    [ActionTypes.SET_DEFAULT_SCORE]: () => defaultState,
    [ActionTypes.FINISH_FETCHING_SCORE]: {
      next: (
        state,
        { payload: { username, videoId, bpm, offset, comment, speed } }
      ) => {
        return {
          ...state,
          username: {
            value: username,
            errors: [],
          },
          videoId: {
            value: videoId,
            errors: [],
          },
          bpm: {
            value: bpm,
            errors: [],
          },
          offset: {
            value: offset,
            errors: [],
          },
          comment: {
            value: comment,
            errors: [],
          },
          speed: {
            value: speed,
            errors: [],
          },
        };
      },
    },
    [ActionTypes.RESET_IDE]: () => initialState,
    [ActionTypes.CONFIG.SET_USERNAME]: handleSetConfigFormAction('username'),
    [ActionTypes.CONFIG.SET_VIDEO_ID]: handleSetConfigFormAction('videoId'),
    [ActionTypes.CONFIG.SET_BPM]: handleSetConfigFormAction('bpm'),
    [ActionTypes.CONFIG.SET_OFFSET]: handleSetConfigFormAction('offset'),
    [ActionTypes.CONFIG.SET_SPEED]: handleSetConfigFormAction('speed'),
    [ActionTypes.CONFIG.SET_COMMENT]: handleSetConfigFormAction('comment'),
  },
  initialState
);
