import { ActionTypes } from '../constants';
import { handleActions } from 'redux-actions';

const initialState = {
  list: [],
  currentPage: 0,
  lastPage: 0,
  isLoading: false,
  error: null,
};

const handleStartFetchingScoresAction = () => ({
  ...initialState,
  isLoading: true,
});

const handleFinishFetchingScoresAction = {
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
};

export default handleActions(
  {
    [ActionTypes.START_FETCHING_SCORES]: handleStartFetchingScoresAction,
    [ActionTypes.FINISH_FETCHING_SCORES]: handleFinishFetchingScoresAction,
    [ActionTypes.RESET_SCORES]: () => initialState,
  },
  initialState
);
