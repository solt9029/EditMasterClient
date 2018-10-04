export const setNotes = (index, notes) => ({
  type: 'SET_NOTES',
  payload: {
    index,
    notes,
  },
});

export const replaceNotes = notes => ({
  type: 'REPLACE_NOTES',
  payload: {
    notes,
  },
});

export const resetEditor = () => ({
  type: 'RESET_EDITOR',
});

export const addIdBar = () => ({
  type: 'ADD_NOTE_BAR',
});

export const removeIdBar = () => ({
  type: 'REMOVE_NOTE_BAR',
});
