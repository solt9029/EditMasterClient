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
    default:
      return state;
  }
};
