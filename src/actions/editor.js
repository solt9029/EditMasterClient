import { ActionTypes } from '../constants/';

export const changeNotes = (index, notes) => ({
  type: ActionTypes.EDITOR.CHANGE_NOTES,
  payload: {
    index,
    notes,
  },
});

export const addBar = () => ({
  type: ActionTypes.EDITOR.ADD_BAR,
});

export const removeBar = () => ({
  type: ActionTypes.EDITOR.REMOVE_BAR,
});
