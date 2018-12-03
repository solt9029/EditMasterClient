import { ActionTypes } from '../constants/';

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
