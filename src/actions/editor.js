export const setNoteIds = (index, num, noteId) => ({
  type: 'SET_NOTE_IDS',
  payload: {
    index,
    num,
    noteId,
  },
});
