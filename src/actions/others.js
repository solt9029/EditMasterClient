import { ActionTypes } from '../constants';
import { createAction } from 'redux-actions';

export const resetIDE = createAction(ActionTypes.RESET_IDE);
export const resetPlay = createAction(ActionTypes.RESET_PLAY);
