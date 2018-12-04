import { ActionTypes } from '../constants';
import { fetchScore as _fetchScore } from '../utils/http';
import { createAction } from 'redux-actions';

export const finishFetchingScore = createAction(
  ActionTypes.FINISH_FETCHING_SCORE
);
export const startFetchingScore = createAction(
  ActionTypes.START_FETCHING_SCORE
);

export const fetchScore = id => {
  return async dispatch => {
    dispatch(startFetchingScore());
    try {
      const result = await _fetchScore(id);
      const { data } = result;
      const videoId = data.video_id;
      const notes = JSON.parse(data.notes);
      const { username, bpm, offset, speed, comment } = data;
      dispatch(
        finishFetchingScore({
          username,
          bpm,
          offset,
          speed,
          comment,
          videoId,
          notes,
        })
      );
    } catch (error) {
      dispatch(finishFetchingScore(error));
    }
  };
};
