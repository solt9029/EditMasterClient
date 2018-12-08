import { ActionTypes, Numbers } from '../constants';
import { handleActions } from 'redux-actions';

const initialState = Numbers.DIVISIONS[0];

export default handleActions(
  {
    [ActionTypes.RESET_IDE]: () => initialState,
    [ActionTypes.SET_CURRENT_DIVISION]: (state, { payload }) => payload,
  },
  initialState
);
