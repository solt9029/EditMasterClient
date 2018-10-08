import axios from 'axios';
import * as config from '../config/';

export const startCreate = () => ({
  type: 'MODAL/START_CREATE',
});

export const create = () => {
  return async (dispatch, getState) => {
    dispatch(startCreate());

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
      const { HOST, PORT } = config.api;
      const result = await axios.post(
        `http://${HOST}:${PORT}/scores/create`,
        data
      );
      dispatch(finishCreateSuccess(result.data.id));
    } catch (error) {
      dispatch(finishCreateError(error.response.data.errors));
    }
  };
};

export const finishCreateSuccess = id => ({
  type: 'MODAL/FINISH_CREATE_SUCCESS',
  payload: {
    id,
  },
});

export const finishCreateError = errors => ({
  type: 'MODAL/FINISH_CREATE_ERROR',
  payload: {
    errors,
  },
});

export const close = () => ({
  type: 'MODAL/CLOSE',
});
