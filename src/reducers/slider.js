import { ActionTypes } from '../constants/';
import { handleActions } from 'redux-actions';

const initialState = {
  isChanging: false,
};

const handleSetIsSliderChangingAction = (state, { payload }) => {
  return {
    isChanging: payload,
  };
};

export default handleActions(
  {
    [ActionTypes.SET_IS_SLIDER_CHANGING]: handleSetIsSliderChangingAction,
    [ActionTypes.RESET_IDE]: () => initialState,
  },
  initialState
);
