import { ActionTypes } from '../constants/';

export const updateState = (index, state) => ({
  type: ActionTypes.UPDATE_STATE,
  payload: {
    index,
    state,
  },
});
