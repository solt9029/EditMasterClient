export const defaultConfig = {
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
    touched: false,
    errors: [],
  },
  videoId: {
    value: '',
    touched: false,
    errors: [],
  },
  bpm: {
    value: 0,
    touched: false,
    errors: [],
  },
  offset: {
    value: 0,
    touched: false,
    errors: [],
  },
  comment: {
    value: '',
    touched: false,
    errors: [],
  },
  speed: {
    value: 0,
    touched: false,
    errors: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NEW/SET_DEFAULT_SCORE': {
      const { username, videoId, bpm, offset, comment, speed } = defaultConfig;
      return {
        ...state,
        username: {
          value: username,
          touched: false,
          errors: [],
        },
        videoId: {
          value: videoId,
          touched: false,
          errors: [],
        },
        bpm: {
          value: bpm,
          touched: false,
          errors: [],
        },
        offset: {
          value: offset,
          touched: false,
          errors: [],
        },
        comment: {
          value: comment,
          touched: false,
          errors: [],
        },
        speed: {
          value: speed,
          touched: false,
          errors: [],
        },
      };
    }
    case 'SHOW/FINISH_REQUEST_SUCCESS': {
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
          touched: false,
          errors: [],
        },
        videoId: {
          value: videoId,
          touched: false,
          errors: [],
        },
        bpm: {
          value: bpm,
          touched: false,
          errors: [],
        },
        offset: {
          value: offset,
          touched: false,
          errors: [],
        },
        comment: {
          value: comment,
          touched: false,
          errors: [],
        },
        speed: {
          value: speed,
          touched: false,
          errors: [],
        },
      };
    }
    case 'CONFIG/RESET':
      return initialState;
    case 'SET_USERNAME':
      return {
        ...state,
        username: {
          value: action.payload.value,
          errors: action.payload.errors,
          touched: action.payload.touched,
        },
      };
    case 'SET_VIDEO_ID':
      return {
        ...state,
        videoId: {
          value: action.payload.value,
          errors: action.payload.errors,
          touched: action.payload.touched,
        },
      };
    case 'SET_BPM':
      return {
        ...state,
        bpm: {
          value: action.payload.value,
          errors: action.payload.errors,
          touched: action.payload.touched,
        },
      };
    case 'SET_OFFSET':
      return {
        ...state,
        offset: {
          value: action.payload.value,
          errors: action.payload.errors,
          touched: action.payload.touched,
        },
      };
    case 'SET_SPEED':
      return {
        ...state,
        speed: {
          value: action.payload.value,
          errors: action.payload.errors,
          touched: action.payload.touched,
        },
      };
    case 'SET_COMMENT':
      return {
        ...state,
        comment: {
          value: action.payload.value,
          errors: action.payload.errors,
          touched: action.payload.touched,
        },
      };
    default:
      return state;
  }
};
