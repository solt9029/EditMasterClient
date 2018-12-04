import { Ids, ActionTypes, Numbers } from '../constants/';

const initialState = {
  note: Ids.NOTE.DON,
  division: Numbers.DIVISIONS[0],
  isAutoMode: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RESET_IDE:
      return initialState;
    case ActionTypes.PALETTE.SET_NOTE:
      return {
        ...state,
        note: action.payload.note,
      };
    case ActionTypes.PALETTE.SET_DIVISION:
      return {
        ...state,
        division: action.payload.division,
      };
    case ActionTypes.PALETTE.TOGGLE_MODE:
      return {
        ...state,
        isAutoMode: !state.isAutoMode,
      };
    default:
      return state;
  }
};
