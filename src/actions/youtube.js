export const setYtPlayer = ytPlayer => ({
  type: 'YOUTUBE/SET_YT_PLAYER',
  payload: {
    ytPlayer,
  },
});

export const setYtPlayerState = ytPlayerState => ({
  type: 'YOUTUBE/SET_YT_PLAYER_STATE',
  payload: {
    ytPlayerState,
  },
});

export const setCurrentTime = currentTime => ({
  type: 'YOUTUBE/SET_CURRENT_TIME',
  payload: {
    currentTime,
  },
});

export const reset = () => ({
  type: 'YOUTUBE/RESET',
});
