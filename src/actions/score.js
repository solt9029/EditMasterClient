import { required, number, validate, maxLength } from '../utils/validations';
import {
  fetchSongle as _fetchSongle,
  createScore as _createScore,
  fetchScore as _fetchScore,
} from '../utils/http';
import { calcSongle } from '../utils/calculations';
import { ActionTypes, Numbers } from '../constants/';
import { createAction } from 'redux-actions';
import { hasState, isNote } from '../utils/note';

const _updateNotes = createAction(ActionTypes.UPDATE_NOTES);
export const addBar = createAction(ActionTypes.ADD_BAR);
export const removeBar = createAction(ActionTypes.REMOVE_BAR);
export const updateState = createAction(ActionTypes.UPDATE_STATE);
export const setDefaultScore = createAction(ActionTypes.SET_DEFAULT_SCORE);
export const startCreatingScore = createAction(
  ActionTypes.START_CREATING_SCORE
);
export const finishCreatingScore = createAction(
  ActionTypes.FINISH_CREATING_SCORE
);
export const finishFetchingScore = createAction(
  ActionTypes.FINISH_FETCHING_SCORE
);
export const startFetchingScore = createAction(
  ActionTypes.START_FETCHING_SCORE
);
export const finishFetchingSongle = createAction(
  ActionTypes.FINISH_FETCHING_SONGLE
);

const createPayloadWithValidation = rules => value => {
  const errors = validate(value, rules);
  return { value, errors };
};

export const setUsername = createAction(
  ActionTypes.SET_USERNAME,
  createPayloadWithValidation([required, maxLength(20)])
);

export const setVideoId = createAction(
  ActionTypes.SET_VIDEO_ID,
  createPayloadWithValidation([required])
);

export const setBpm = createAction(
  ActionTypes.SET_BPM,
  createPayloadWithValidation([required, number])
);

export const setOffset = createAction(
  ActionTypes.SET_OFFSET,
  createPayloadWithValidation([required, number])
);

export const setSpeed = createAction(
  ActionTypes.SET_SPEED,
  createPayloadWithValidation([required, number])
);

export const setComment = createAction(
  ActionTypes.SET_COMMENT,
  createPayloadWithValidation([maxLength(140)])
);

/**
 *
 * @param {?string} key
 */
export const updateNotes = (key = null) => {
  return (dispatch, getState) => {
    const state = getState();
    const { caret, currentDivision } = state;
    let { currentNote } = state;

    if (key !== null) {
      if (isNote(+key)) {
        currentNote = +key;
      } else {
        return;
      }
    }

    // TODO: make a utility function for this calc part.
    const notesPerDivision = Numbers.NOTES_PER_BAR / currentDivision;
    const mouseNotesPerBarIndex = caret.divisionIndex * notesPerDivision;
    const index =
      caret.barIndex * Numbers.NOTES_PER_BAR + mouseNotesPerBarIndex;

    let notes = [];
    if (!hasState(currentNote)) {
      for (let i = 0; i < notesPerDivision; i++) {
        notes.push(currentNote);
      }
    } else {
      notes.push(currentNote);
    }
    dispatch(_updateNotes({ index, notes }));
  };
};

export const paste = () => {
  return (dispatch, getState) => {
    const { clipboard, caret } = getState();
    if (clipboard.length <= 0) {
      return;
    }
    const index = caret.barIndex * Numbers.NOTES_PER_BAR;
    dispatch(_updateNotes({ index, notes: clipboard }));
  };
};

export const fetchSongle = videoId => {
  return async dispatch => {
    try {
      const result = await _fetchSongle(videoId);
      if (!result.data.beats) {
        return;
      }
      const payload = calcSongle(result.data.beats);
      dispatch(finishFetchingSongle(payload));
    } catch (error) {
      // error handling
    }
  };
};

export const createScore = () => {
  return async (dispatch, getState) => {
    dispatch(startCreatingScore());

    const {
      bpm,
      videoId,
      username,
      offset,
      speed,
      comment,
      notes,
    } = getState().score;

    const data = {
      bpm: bpm.value,
      video_id: videoId.value,
      username: username.value,
      offset: offset.value,
      speed: speed.value,
      comment: comment.value,
      notes: notes.list,
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
