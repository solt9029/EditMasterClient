import { ActionTypes } from '../constants';
import { createAction } from 'redux-actions';
import { toNumber } from '../utils/type';

export const setCurrentDivision = createAction(
  ActionTypes.SET_CURRENT_DIVISION,
  toNumber
);
