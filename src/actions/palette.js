import { ActionTypes } from '../constants/';
import { createAction } from 'redux-actions';

export const setCurrentNote = createAction(
  ActionTypes.SET_CURRENT_NOTE,
  value => +value
);

export const setCurrentDivision = createAction(
  ActionTypes.SET_CURRENT_DIVISION,
  value => +value
);

export const toggleMode = createAction(ActionTypes.TOGGLE_MODE);
