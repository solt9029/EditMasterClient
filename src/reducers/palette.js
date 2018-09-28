import constants from '../constants';

const initialState = {
  note: constants.id.note.don,
  division: 16,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PALETTE_NOTE':
      return {
        ...state,
        note: action.payload.note,
      };
    case 'SET_PALETTE_DIVISION':
      return {
        ...state,
        division: action.payload.division,
      };
    default:
      return state;
  }
};
