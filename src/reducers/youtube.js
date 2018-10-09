import { ids, actionTypes } from '../constants/';

const initialState = {
  ytPlayer: null,
  ytPlayerState: ids.YOUTUBE.UNSTARTED,
  currentTime: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.YOUTUBE.SET_YT_PLAYER:
      return {
        ...state,
        ytPlayer: action.payload.ytPlayer,
      };
    case actionTypes.YOUTUBE.SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.payload.currentTime,
      };
    case actionTypes.YOUTUBE.SET_YT_PLAYER_STATE:
      return {
        ...state,
        ytPlayerState: action.payload.ytPlayerState,
      };
    case actionTypes.YOUTUBE.RESET:
      return initialState;
    default:
      return state;
  }
};
