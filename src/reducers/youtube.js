import { Ids, ActionTypes } from '../constants/';

const initialState = {
  ytPlayer: null,
  ytPlayerState: Ids.YOUTUBE.UNSTARTED,
  currentTime: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.YOUTUBE.SET_YT_PLAYER:
      return {
        ...state,
        ytPlayer: action.payload.ytPlayer,
      };
    case ActionTypes.YOUTUBE.SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.payload.currentTime,
      };
    case ActionTypes.YOUTUBE.SET_YT_PLAYER_STATE:
      return {
        ...state,
        ytPlayerState: action.payload.ytPlayerState,
      };
    case ActionTypes.YOUTUBE.RESET:
      return initialState;
    default:
      return state;
  }
};
