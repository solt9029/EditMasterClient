import { ActionTypes } from '../constants';
import { handleActions } from 'redux-actions';

const initialState = {
  list: [],
  currentPage: 0,
  lastPage: 0,
  isLoading: false,
  error: null,
};

export default handleActions(
  {
    [ActionTypes.START_FETCHING_SCORES]: () => ({
      ...initialState,
      isLoading: true,
    }),
    [ActionTypes.FINISH_FETCHING_SCORES]: {
      next: (state, { payload: { list, currentPage, lastPage } }) => {
        return {
          list,
          currentPage,
          lastPage,
          isLoading: false,
          error: null,
        };
      },
      throw: (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }),
    },
    [ActionTypes.RESET_SCORES]: () => initialState,
  },
  initialState
);
