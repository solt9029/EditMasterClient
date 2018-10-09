import { ids } from '../constants/';

const initialState = {
  note: ids.NOTE.DON,
  division: 16,
  isAutoMode: true,
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
    case 'PALETTE/TOGGLE_MODE':
      return {
        ...state,
        isAutoMode: !state.isAutoMode,
      };
    default:
      return state;
  }
};
