import { ActionTypes } from '../constants/';
import { handleActions } from 'redux-actions';

const initialState = {
  isLoading: false,
  id: 0,
  errors: null,
};

export default handleActions(
  {
    [ActionTypes.START_CREATING_SCORE]: state => ({
      ...state,
      isLoading: true,
    }),
    [ActionTypes.FINISH_CREATING_SCORE]: {
      next: (state, { payload }) => ({
        isLoading: false,
        errors: null,
        id: payload,
      }),
      throw: (state, { payload }) => ({
        ...state,
        isLoading: false,
        errors: payload.response.data.errors,
      }),
    },
  },
  initialState
);
