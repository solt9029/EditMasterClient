export const setYtPlayer = ytPlayer => ({
  type: 'SET_YTPLAYER',
  payload: {
    ytPlayer,
  },
});

export const setCurrentTime = currentTime => ({
  type: 'SET_CURRENT_TIME',
  payload: {
    currentTime,
  },
});

export const toggleMode = () => ({
  type: 'TOGGLE_MODE',
});
