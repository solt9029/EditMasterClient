import { ActionTypes } from '../constants/';
import { handleActions } from 'redux-actions';

const initialState = {
  isChanging: false,
};

export default handleActions(
  {
    [ActionTypes.SET_IS_SLIDER_CHANGING]: (state, action) => {
      return {
        isChanging: action.payload,
      };
    },
  },
  initialState
);
