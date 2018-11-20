import { ids, actionTypes, numbers } from '../constants/';

const initialState = {
  note: ids.NOTE.DON,
  division: numbers.DIVISIONS[0],
  isAutoMode: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PALETTE.RESET:
      return initialState;
    case actionTypes.PALETTE.SET_NOTE:
      return {
        ...state,
        note: action.payload.note,
      };
    case actionTypes.PALETTE.SET_DIVISION:
      return {
        ...state,
        division: action.payload.division,
      };
    case actionTypes.PALETTE.TOGGLE_MODE:
      return {
        ...state,
        isAutoMode: !state.isAutoMode,
      };
    default:
      return state;
  }
};
