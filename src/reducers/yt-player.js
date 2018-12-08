import { ActionTypes } from '../constants/';
import { handleActions } from 'redux-actions';

const initialState = null;

export default handleActions(
  {
    [ActionTypes.SET_YT_PLAYER]: (state, { payload }) => payload,
    [ActionTypes.RESET_IDE]: () => initialState,
  },
  initialState
);
