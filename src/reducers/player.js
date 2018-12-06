import { ActionTypes } from '../constants/';
import { handleActions } from 'redux-actions';

const initialState = {
  isAutoMode: true,
};

const handleToggleModeAction = state => ({
  isAutoMode: !state.isAutoMode,
});

export default handleActions(
  {
    [ActionTypes.RESET_IDE]: () => initialState,
    [ActionTypes.TOGGLE_MODE]: handleToggleModeAction,
  },
  initialState
);
