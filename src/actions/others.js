import { ActionTypes } from '../constants';
import { createAction } from 'redux-actions';
import { exportTja } from '../utils/file';

export const resetIDE = createAction(ActionTypes.RESET_IDE);
export const resetPlay = createAction(ActionTypes.RESET_PLAY);

export const exportTjaFile = () => {
  return (dispatch, getState) => {
    const { notes, videoId, bpm, offset } = getState().score;
    exportTja(notes.list, videoId.value, bpm.value, offset.value);
  };
};
