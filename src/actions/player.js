import { actionTypes } from '../constants/';

export const setChangingSlider = isChangingSlider => ({
  type: actionTypes.PLAYER.SET_CHANGING_SLIDER,
  payload: {
    isChangingSlider,
  },
});

export const setState = (index, state) => ({
  type: actionTypes.PLAYER.SET_STATE,
  payload: {
    index,
    state,
  },
});

export const freshStates = () => ({
  type: actionTypes.PLAYER.FRESH_STATES,
});

export const reset = () => ({
  type: actionTypes.PLAYER.RESET,
});
