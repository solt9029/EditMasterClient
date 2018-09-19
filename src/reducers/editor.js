import Note from '../Note';

/* eslint-disable */
const noteIds = [
  1, 0, 2, 0, 3, 0, 4, 0, 5, 5, 5, 5, 5, 0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
/* eslint-enable */

let notes = [];
noteIds.forEach(noteId => {
  notes.push(new Note(noteId));
});

const initialState = {
  notes,
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
