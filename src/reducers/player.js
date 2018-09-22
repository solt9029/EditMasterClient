const initialState = {
  ytPlayer: null,
  currentTime: 0,
  isAutoMode: true,
  isChangingSlider: false,
  secondsPerNote: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_YTPLAYER':
      return {
        ...state,
        ytPlayer: action.payload.ytPlayer,
      };
    case 'SET_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.payload.currentTime,
      };
    case 'TOGGLE_MODE':
      return {
        ...state,
        isAutoMode: !state.isAutoMode,
      };
    case 'SET_CHANGING_SLIDER':
      return {
        ...state,
        isChangingSlider: action.payload.isChangingSlider,
      };
    case 'SET_SECONDS_PER_NOTE':
      return {
        ...state,
        secondsPerNote: action.payload.secondsPerNote,
      };
    default:
      return state;
  }
};
