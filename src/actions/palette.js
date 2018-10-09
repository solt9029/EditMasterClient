import { actionTypes } from '../constants/';

export const setNote = note => ({
  type: actionTypes.PALETTE.SET_NOTE,
  payload: {
    note: +note,
  },
});

export const setDivision = division => ({
  type: actionTypes.PALETTE.SET_DIVISION,
  payload: {
    division: +division,
  },
});

export const reset = () => ({
  type: actionTypes.PALETTE.RESET,
});

export const toggleMode = () => ({
  type: actionTypes.PALETTE.TOGGLE_MODE,
});
