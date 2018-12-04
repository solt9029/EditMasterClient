import { ActionTypes } from '../constants/';
import { createAction } from 'redux-actions';

export const setYtPlayer = createAction(ActionTypes.SET_YT_PLAYER);
export const setCurrentTime = createAction(ActionTypes.SET_CURRENT_TIME);
