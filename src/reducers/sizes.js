import { ActionTypes } from '../constants';
import { handleActions } from 'redux-actions';

export const initialState = {
  player: { width: 0, height: 0 },
  editor: { width: 0, height: 0 },
  palette: { width: 0, height: 0 },
};

export default handleActions(
  {
    [ActionTypes.SET_SIZES]: (state, { payload }) => payload,
    [ActionTypes.RESET_IDE]: () => initialState,
  },
  initialState
);
