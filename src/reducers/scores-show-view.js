import { ActionTypes } from '../constants';
import { handleActions } from 'redux-actions';

const initialState = {
  error: null,
  isLoading: false,
};

export default handleActions(
  {
    [ActionTypes.START_FETCHING_SCORE]: () => ({
      error: null,
      isLoading: true,
    }),
    [ActionTypes.FINISH_FETCHING_SCORE]: {
      next: () => initialState,
      throw: (state, { payload }) => ({
        error: payload,
        isLoading: false,
      }),
    },
  },
  initialState
);
