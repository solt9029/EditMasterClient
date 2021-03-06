import { ActionTypes } from '../constants';
import { createAction } from 'redux-actions';
import { toNumber } from '../utils/type';

export const setCurrentNote = createAction(
  ActionTypes.SET_CURRENT_NOTE,
  toNumber
);
