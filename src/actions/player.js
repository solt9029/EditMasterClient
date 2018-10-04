export const setChangingSlider = isChangingSlider => ({
  type: 'PLAYER/SET_CHANGING_SLIDER',
  payload: {
    isChangingSlider,
  },
});

export const setState = (index, state) => ({
  type: 'PLAYER/SET_STATE',
  payload: {
    index,
    state,
  },
});

export const freshStates = () => ({
  type: 'PLAYER/FRESH_STATES',
});

export const reset = () => ({
  type: 'PLAYER/RESET',
});
