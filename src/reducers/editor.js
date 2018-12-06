import { Ids, ActionTypes, Numbers } from '../constants';
import { handleActions } from 'redux-actions';

const initialState = {
  currentNote: Ids.NOTE.DON,
  currentDivision: Numbers.DIVISIONS[0],
};

export default handleActions(
  {
    [ActionTypes.RESET_IDE]: () => initialState,
    [ActionTypes.SET_CURRENT_NOTE]: (state, { payload }) => ({
      ...state,
      currentNote: payload,
    }),
    [ActionTypes.SET_CURRENT_DIVISION]: (state, { payload }) => ({
      ...state,
      currentDivision: payload,
    }),
  },
  initialState
);
