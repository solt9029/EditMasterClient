import { ActionTypes } from '../constants/';

export const updateNotes = (index, notes) => ({
  type: ActionTypes.UPDATE_NOTES,
  payload: {
    index,
    notes,
  },
});

export const addBar = () => ({
  type: ActionTypes.ADD_BAR,
});

export const removeBar = () => ({
  type: ActionTypes.REMOVE_BAR,
});
