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

export default handleActions(
  {
    [ActionTypes.SCORES_NEW_VIEW.SET_DEFAULT_SCORE]: (state, action) =>
      defaultState,
    [ActionTypes.SCORES_SHOW_VIEW.FINISH_REQUEST_SUCCESS]: (state, action) => {
      const {
        username,
        videoId,
        bpm,
        offset,
        comment,
        speed,
      } = action.payload.config;
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
    [ActionTypes.RESET_IDE]: (state, action) => {
      return initialState;
    },
    [ActionTypes.CONFIG.SET_USERNAME]: (state, action) => {
      return {
        ...state,
        username: action.payload,
      };
    },
    [ActionTypes.CONFIG.SET_VIDEO_ID]: (state, action) => {
      return {
        ...state,
        videoId: action.payload,
      };
    },
    [ActionTypes.CONFIG.SET_BPM]: (state, action) => {
      return {
        ...state,
        bpm: action.payload,
      };
    },
    [ActionTypes.CONFIG.SET_OFFSET]: (state, action) => {
      return {
        ...state,
        offset: action.payload,
      };
    },
    [ActionTypes.CONFIG.SET_SPEED]: (state, action) => {
      return {
        ...state,
        speed: action.payload,
      };
    },
    [ActionTypes.CONFIG.SET_COMMENT]: (state, action) => {
      return {
        ...state,
        comment: action.payload,
      };
    },
  },
  initialState
);
