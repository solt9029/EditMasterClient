import { ActionTypes } from '../constants/';

export const setChangingSlider = isChangingSlider => ({
  type: ActionTypes.PLAYER.SET_CHANGING_SLIDER,
  payload: {
    isChangingSlider,
  },
});

export const setState = (index, state) => ({
  type: ActionTypes.PLAYER.SET_STATE,
  payload: {
    index,
    state,
  },
});

export const freshStates = () => ({
  type: ActionTypes.PLAYER.FRESH_STATES,
});

export const reset = () => ({
  type: ActionTypes.PLAYER.RESET,
});
