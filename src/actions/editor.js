export const setNoteIds = (index, noteIds) => ({
  type: 'SET_NOTE_IDS',
  payload: {
    index,
    noteIds,
  },
});

export const replaceNoteIds = noteIds => ({
  type: 'REPLACE_NOTE_IDS',
  payload: {
    noteIds,
  },
});

export const resetNoteIds = noteIds => ({
  type: 'RESET_NOTE_IDS',
});

export const addIdBar = () => ({
  type: 'ADD_ID_BAR',
});

export const removeIdBar = () => ({
  type: 'REMOVE_ID_BAR',
});
