import { ActionTypes } from '../constants/';
import { createAction } from 'redux-actions';
import { toNumber } from '../utils/type';

export const setCurrentNote = createAction(
  ActionTypes.SET_CURRENT_NOTE,
  toNumber
);

export const setCurrentDivision = createAction(
  ActionTypes.SET_CURRENT_DIVISION,
  toNumber
);

export const toggleMode = createAction(ActionTypes.TOGGLE_MODE);
