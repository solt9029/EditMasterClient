import { ActionTypes } from '../constants/';
import { createAction } from 'redux-actions';

export const setCurrentTime = createAction(ActionTypes.SET_CURRENT_TIME);
