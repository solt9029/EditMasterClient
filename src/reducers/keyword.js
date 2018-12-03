import { ActionTypes } from '../constants';
import { handleActions } from 'redux-actions';

const initialState = '';

export default handleActions(
  {
    [ActionTypes.SET_KEYWORD]: (state, { payload }) => payload,
  },
  initialState
);
