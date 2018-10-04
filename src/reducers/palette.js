import constants from '../constants';

const initialState = {
  note: constants.id.note.don,
  division: 16,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PALETTE/RESET':
      return initialState;
    case 'PALETTE/SET_NOTE':
      return {
        ...state,
        note: action.payload.note,
      };
    case 'PALETTE/SET_DIVISION':
      return {
        ...state,
        division: action.payload.division,
      };
    default:
      return state;
  }
};
