export const defaultConfig = {
  username: '通りすがりの創作の達人',
  videoId: 'PqJNc9KVIZE',
  bpm: 150,
  offset: 12.08,
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
    case 'RESET_CONFIG':
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
