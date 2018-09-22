export const setNoteIds = (index, num, noteId) => ({
  type: 'SET_NOTE_IDS',
  payload: {
    index,
    num,
    noteId,
  },
});

export const addIdBar = () => ({
  type: 'ADD_ID_BAR',
});
