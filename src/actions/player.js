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

export const reset = () => ({
  type: 'PLAYER/RESET',
});
