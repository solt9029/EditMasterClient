import { ActionTypes } from '../constants';
import { createAction } from 'redux-actions';
import { fetchScores as _fetchScores } from '../utils/http';

export const resetScores = createAction(ActionTypes.RESET_SCORES);
export const startFetchingScores = createAction(
  ActionTypes.START_FETCHING_SCORES
);
export const finishFetchingScores = createAction(
  ActionTypes.FINISH_FETCHING_SCORES
);

export const fetchScores = (page, keyword) => {
  return async dispatch => {
    dispatch(startFetchingScores());
    try {
      const result = await _fetchScores(page, keyword);
      const { current_page, last_page, data } = result.data;
      dispatch(
        finishFetchingScores({
          list: data,
          currentPage: current_page,
          lastPage: last_page,
        })
      );
    } catch (error) {
      dispatch(finishFetchingScores(error));
    }
  };
};
