import { ActionTypes } from '../constants/';
import { handleActions } from 'redux-actions';

const defaultConfig = {
  username: '通りすがりの創作の達人',
  videoId: 'jhOVibLEDhA',
  bpm: 158,
  offset: 0.75,
  comment: '創作の達人で創作譜面をしました！',
  speed: 1,
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
    [ActionTypes.SCORES_NEW_VIEW.SET_DEFAULT_SCORE]: (state, action) => {
      const { username, videoId, bpm, offset, comment, speed } = defaultConfig;
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
        username: {
          value: action.payload.value,
          errors: action.payload.errors,
        },
      };
    },
    [ActionTypes.CONFIG.SET_VIDEO_ID]: (state, action) => {
      return {
        ...state,
        videoId: {
          value: action.payload.value,
          errors: action.payload.errors,
        },
      };
    },
    [ActionTypes.CONFIG.SET_BPM]: (state, action) => {
      return {
        ...state,
        bpm: {
          value: action.payload.value,
          errors: action.payload.errors,
        },
      };
    },
    [ActionTypes.CONFIG.SET_OFFSET]: (state, action) => {
      return {
        ...state,
        offset: {
          value: action.payload.value,
          errors: action.payload.errors,
        },
      };
    },
    [ActionTypes.CONFIG.SET_SPEED]: (state, action) => {
      return {
        ...state,
        speed: {
          value: action.payload.value,
          errors: action.payload.errors,
        },
      };
    },
    [ActionTypes.CONFIG.SET_COMMENT]: (state, action) => {
      return {
        ...state,
        comment: {
          value: action.payload.value,
          errors: action.payload.errors,
        },
      };
    },
  },
  initialState
);
