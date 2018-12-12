import { ActionTypes } from '../constants';
import { handleActions } from 'redux-actions';

const initialState = 0;

export default handleActions(
  {
    [ActionTypes.SET_SCROLL]: (state, { payload }) => payload,
    [ActionTypes.RESET_IDE]: () => initialState,
  },
  initialState
);
