import { ActionTypes } from '../constants/';
import { handleActions } from 'redux-actions';

const initialState = [];

export default handleActions(
  {
    [ActionTypes.COPY]: (state, { payload }) => payload,
    [ActionTypes.RESET_IDE]: () => initialState,
  },
  initialState
);
