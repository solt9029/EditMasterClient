import { ActionTypes } from '../constants/';
import { handleActions } from 'redux-actions';

const initialState = {
  ytPlayer: null,
  currentTime: 0,
};

const handleSetYtPlayerAction = (state, action) => ({
  ...state,
  ytPlayer: action.payload,
});

const handleSetCurrentTimeAction = (state, action) => ({
  ...state,
  currentTime: action.payload,
});

export default handleActions(
  {
    [ActionTypes.SET_YT_PLAYER]: handleSetYtPlayerAction,
    [ActionTypes.SET_CURRENT_TIME]: handleSetCurrentTimeAction,
    [ActionTypes.RESET_IDE]: () => initialState,
  },
  initialState
);
