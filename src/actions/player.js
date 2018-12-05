import { ActionTypes } from '../constants/';

export const updateState = (index, state) => ({
  type: ActionTypes.UPDATE_STATE,
  payload: {
    index,
    state,
  },
});

export const freshStates = () => ({
  type: ActionTypes.PLAYER.FRESH_STATES,
});
