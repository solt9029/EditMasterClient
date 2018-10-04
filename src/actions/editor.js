export const changeNotes = (index, notes) => ({
  type: 'EDITOR/CHANGE_NOTES',
  payload: {
    index,
    notes,
  },
});

export const setNotes = notes => ({
  type: 'EDITOR/SET_NOTES',
  payload: {
    notes,
  },
});

export const reset = () => ({
  type: 'EDITOR/RESET',
});

export const addBar = () => ({
  type: 'EDITOR/ADD_BAR',
});

export const removeBar = () => ({
  type: 'EDITOR/REMOVE_BAR',
});
