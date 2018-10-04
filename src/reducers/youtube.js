import constants from '../constants';

const initialState = {
  ytPlayer: null,
  ytPlayerState: constants.id.youtube.unstarted,
  currentTime: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'YOUTUBE/SET_YT_PLAYER':
      return {
        ...state,
        ytPlayer: action.payload.ytPlayer,
      };
    case 'YOUTUBE/SET_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.payload.currentTime,
      };
    case 'YOUTUBE/SET_YT_PLAYER_STATE':
      return {
        ...state,
        ytPlayerState: action.payload.ytPlayerState,
      };
    case 'YOUTUBE/RESET':
      return initialState;
    default:
      return state;
  }
};
