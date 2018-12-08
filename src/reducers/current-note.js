import { Ids, ActionTypes } from '../constants';
import { handleActions } from 'redux-actions';

const initialState = Ids.NOTE.DON;

export default handleActions(
  {
    [ActionTypes.RESET_IDE]: () => initialState,
    [ActionTypes.SET_CURRENT_NOTE]: (state, { payload }) => payload,
  },
  initialState
);
