import { ActionTypes } from '../constants/';
import { createAction } from 'redux-actions';

export const toggleMode = createAction(ActionTypes.TOGGLE_MODE);
