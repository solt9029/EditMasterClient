import { ActionTypes } from '../constants/';

export const setYtPlayer = ytPlayer => ({
  type: ActionTypes.YOUTUBE.SET_YT_PLAYER,
  payload: {
    ytPlayer,
  },
});

export const setYtPlayerState = ytPlayerState => ({
  type: ActionTypes.YOUTUBE.SET_YT_PLAYER_STATE,
  payload: {
    ytPlayerState,
  },
});

export const setCurrentTime = currentTime => ({
  type: ActionTypes.YOUTUBE.SET_CURRENT_TIME,
  payload: {
    currentTime,
  },
});

export const reset = () => ({
  type: ActionTypes.YOUTUBE.RESET,
});
