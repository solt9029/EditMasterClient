import { id } from '../constants';

const initialState = {
  note: id.note.don,
  division: 16,
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};