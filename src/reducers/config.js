export const defaultState = {
  username: '通りすがりの創作の達人',
  videoId: 'PqJNc9KVIZE',
  bpm: 150,
  offset: 12.08,
  comment: '創作の達人で創作譜面をしました！',
  speed: 1,
};

const initialState = {
  username: '',
  videoId: '',
  bpm: 0,
  offset: 0,
  comment: '',
  speed: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONFIG':
      return {
        ...state,
        ...action.payload.config,
      };
    default:
      return state;
  }
};
