import { ActionTypes } from '../constants/';
import { createAction } from 'redux-actions';

export const updateState = createAction(ActionTypes.UPDATE_STATE);
