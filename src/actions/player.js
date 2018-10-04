export const setYtPlayer = ytPlayer => ({
  type: 'SET_YTPLAYER',
  payload: {
    ytPlayer,
  },
});

export const setYtPlayerState = ytPlayerState => ({
  type: 'SET_YTPLAYER_STATE',
  payload: {
    ytPlayerState,
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

export const setChangingSlider = isChangingSlider => ({
  type: 'SET_CHANGING_SLIDER',
  payload: {
    isChangingSlider,
  },
});

export const setState = (index, state) => ({
  type: 'SET_STATE',
  payload: {
    index,
    state,
  },
});

export const freshStates = () => ({
  type: 'FRESH_STATES',
});

export const resetStates = () => ({
  type: 'RESET_STATES',
});
