const initialState = {
  ytPlayer: null,
  currentTime: 0,
  isChangingSlider: false,
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
    default:
      return state;
  }
};
