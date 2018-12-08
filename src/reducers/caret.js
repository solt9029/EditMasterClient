import { ActionTypes } from '../constants/';
import { handleActions } from 'redux-actions';

const initialState = {
  x: 0,
  y: 0,
  barIndex: 0,
  divisionIndex: 0,
};

export default handleActions(
  {
    [ActionTypes.RESET_IDE]: () => initialState,
    [ActionTypes.SET_CARET]: (state, { payload }) => payload,
  },
  initialState
);
