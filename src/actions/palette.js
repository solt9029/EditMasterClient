import { ActionTypes } from '../constants/';

export const setNote = note => ({
  type: ActionTypes.PALETTE.SET_NOTE,
  payload: {
    note: +note,
  },
});

export const setDivision = division => ({
  type: ActionTypes.PALETTE.SET_DIVISION,
  payload: {
    division: +division,
  },
});

export const reset = () => ({
  type: ActionTypes.PALETTE.RESET,
});

export const toggleMode = () => ({
  type: ActionTypes.PALETTE.TOGGLE_MODE,
});
