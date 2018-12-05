import { ActionTypes } from '../constants/';
import { createAction } from 'redux-actions';

export const updateNotes = createAction(ActionTypes.UPDATE_NOTES);
export const addBar = createAction(ActionTypes.ADD_BAR);
export const removeBar = createAction(ActionTypes.REMOVE_BAR);
