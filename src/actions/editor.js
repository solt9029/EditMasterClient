import { actionTypes } from '../constants/';

export const changeNotes = (index, notes) => ({
  type: actionTypes.EDITOR.CHANGE_NOTES,
  payload: {
    index,
    notes,
  },
});

export const setNotes = notes => ({
  type: actionTypes.EDITOR.SET_NOTES,
  payload: {
    notes,
  },
});

export const reset = () => ({
  type: actionTypes.EDITOR.RESET,
});

export const addBar = () => ({
  type: actionTypes.EDITOR.ADD_BAR,
});

export const removeBar = () => ({
  type: actionTypes.EDITOR.REMOVE_BAR,
});
