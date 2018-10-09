import { actionTypes } from '../constants/';

export const setYtPlayer = ytPlayer => ({
  type: actionTypes.YOUTUBE.SET_YT_PLAYER,
  payload: {
    ytPlayer,
  },
});

export const setYtPlayerState = ytPlayerState => ({
  type: actionTypes.YOUTUBE.SET_YT_PLAYER_STATE,
  payload: {
    ytPlayerState,
  },
});

export const setCurrentTime = currentTime => ({
  type: actionTypes.YOUTUBE.SET_CURRENT_TIME,
  payload: {
    currentTime,
  },
});

export const reset = () => ({
  type: actionTypes.YOUTUBE.RESET,
});
