import { ActionTypes } from '../constants/';
import { createScore as _createScore } from '../utils/http';
import { createAction } from 'redux-actions';

export const startCreatingScore = createAction(
  ActionTypes.START_CREATING_SCORE
);
export const finishCreatingScore = createAction(
  ActionTypes.FINISH_CREATING_SCORE
);

export const createScore = () => {
  return async (dispatch, getState) => {
    dispatch(startCreatingScore());

    const state = getState();
    const { bpm, videoId, username, offset, speed, comment } = state.config;
    const { notes } = state.editor;

    const data = {
      bpm: bpm.value,
      video_id: videoId.value,
      username: username.value,
      offset: offset.value,
      speed: speed.value,
      comment: comment.value,
      notes,
    };

    try {
      const result = await _createScore(data);
      dispatch(finishCreatingScore(result.data.id));
    } catch (error) {
      // error.response.data.errors
      dispatch(finishCreatingScore(error));
    }
  };
};
