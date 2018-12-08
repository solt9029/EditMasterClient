import { ActionTypes } from '../constants';
import { handleActions } from 'redux-actions';
import { Ids, Numbers } from '../constants';
import { cloneDeep } from 'lodash'; // when you use initialState, you have to use cloneDeep to ensure that initialState's properties are always same.

// HACK: notes and states are mutable for performance.
const initialState = {
  username: { value: '', errors: [] },
  comment: { value: '', errors: [] },
  bpm: { value: '', errors: [] },
  offset: { value: '', errors: [] },
  speed: { value: '', errors: [] },
  videoId: { value: '', errors: [] },
  notes: { list: [], updatedCount: 0 },
  states: { list: [], updatedCount: 0 },
  fetching: { isLoading: false, error: null },
  creating: { isLoading: false, errors: null, id: 0 },
};

const defaultState = {
  ...cloneDeep(initialState),
  username: { value: '通りすがりの創作の達人', errors: [] },
  videoId: { value: 'jhOVibLEDhA', errors: [] },
  bpm: { value: 158, errors: [] },
  offset: { value: 0.75, errors: [] },
  comment: { value: '創作の達人で創作譜面をしました！', errors: [] },
  speed: { value: 1, errors: [] },
  notes: {
    updatedCount: 0,
    /* eslint-disable */
    list: [
      3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    /* eslint-enable */
  },
  states: {
    updatedCount: 0,
    /* eslint-disable */
    list: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    /* eslint-enable */
  },
};

const handleResetIDEAction = state => ({
  ...cloneDeep(initialState),
  fetching: {
    ...state.fetching,
  },
});

const handleSetDefaultScoreAction = () => cloneDeep(defaultState);

const handleSetUsernameAction = (state, { payload }) => ({
  ...state,
  username: payload,
});

const handleSetOffsetAction = (state, { payload }) => ({
  ...state,
  offset: payload,
});

const handleSetBpmAction = (state, { payload }) => ({
  ...state,
  bpm: payload,
});

const handleSetSpeedAction = (state, { payload }) => ({
  ...state,
  speed: payload,
});

const handleSetCommentAction = (state, { payload }) => ({
  ...state,
  comment: payload,
});

const handleSetVideoIdAction = (state, { payload }) => ({
  ...state,
  videoId: payload,
});

const handleFinishFetchingSongleAction = (
  state,
  { payload: { bpm, offset } }
) => ({
  ...state,
  bpm: { value: bpm, errors: [] },
  offset: { value: offset, errors: [] },
});

const handleFinishFetchingScoreAction = {
  next: (
    state,
    { payload: { username, videoId, bpm, offset, comment, speed, notes } }
  ) => ({
    ...state,
    username: { value: username, errors: [] },
    videoId: { value: videoId, errors: [] },
    bpm: { value: bpm, errors: [] },
    offset: { value: offset, errors: [] },
    comment: { value: comment, errors: [] },
    speed: { value: speed, errors: [] },
    notes: { list: notes, updatedCount: 0 },
    states: { list: Array(notes.length).fill(Ids.NOTE.SPACE), updatedCount: 0 },
    fetching: { isLoading: false, error: null },
  }),
  throw: (state, { payload }) => ({
    ...state,
    fetching: { error: payload, isLoading: false },
  }),
};

const handleUpdateNotesAction = (state, { payload: { notes, index } }) => {
  for (let i = 0; i < notes.length; i++) {
    state.notes.list[index + i] = notes[i];
  }
  // add bar
  if (index >= state.notes.list.length - Numbers.NOTES_PER_BAR) {
    for (let i = 0; i < Numbers.NOTES_PER_BAR; i++) {
      state.notes.list.push(Ids.NOTE.SPACE);
      state.states.list.push(Ids.STATE.FRESH);
    }
  }
  return {
    ...state,
    notes: {
      ...state.notes,
      updatedCount: state.notes.updatedCount + 1,
    },
    states: {
      ...state.states,
      updatedCount: state.states.updatedCount + 1,
    },
  };
};

const handleAddBarAction = state => {
  for (let i = 0; i < Numbers.NOTES_PER_BAR; i++) {
    state.notes.list.push(Ids.NOTE.SPACE);
    state.states.list.push(Ids.STATE.FRESH);
  }
  return {
    ...state,
    notes: {
      ...state.notes,
      updatedCount: state.notes.updatedCount + 1,
    },
    states: {
      ...state.states,
      updatedCount: state.states.updatedCount + 1,
    },
  };
};

const handleRemoveBarAction = state => {
  if (state.notes.list.length < Numbers.NOTES_PER_BAR * 2) {
    return state;
  }
  for (let i = 0; i < Numbers.NOTES_PER_BAR; i++) {
    state.notes.list.pop();
    state.states.list.pop();
  }
  return {
    ...state,
    notes: {
      ...state.notes,
      updatedCount: state.notes.updatedCount + 1,
    },
    states: {
      ...state.states,
      updatedCount: state.states.updatedCount + 1,
    },
  };
};

const handleUpdateStateAction = (state, { payload }) => {
  state.states.list[payload.index] = payload.state;
  return {
    ...state,
    states: {
      ...state.states,
      updatedCount: state.states.updatedCount + 1,
    },
  };
};

const handleResetPlayAction = state => {
  return {
    ...state,
    states: {
      list: Array(state.states.list.length).fill(Ids.NOTE.SPACE),
      updatedCount: state.states.updatedCount + 1,
    },
  };
};

const handleStartFetchingScoreAction = () => ({
  ...cloneDeep(initialState),
  fetching: { error: null, isLoading: true },
});

const handleStartCreatingScoreAction = state => ({
  ...state,
  creating: { error: null, isLoading: true },
});

const handleFinishCreatingScoreAction = {
  next: (state, { payload }) => ({
    ...state,
    creating: {
      isLoading: false,
      errors: null,
      id: payload,
    },
  }),
  throw: (state, { payload }) => ({
    ...state,
    creating: {
      ...state.creating,
      isLoading: false,
      errors: payload.response.data.errors,
    },
  }),
};

export default handleActions(
  {
    [ActionTypes.RESET_IDE]: handleResetIDEAction,
    [ActionTypes.SET_DEFAULT_SCORE]: handleSetDefaultScoreAction,
    [ActionTypes.SET_USERNAME]: handleSetUsernameAction,
    [ActionTypes.SET_VIDEO_ID]: handleSetVideoIdAction,
    [ActionTypes.SET_BPM]: handleSetBpmAction,
    [ActionTypes.SET_OFFSET]: handleSetOffsetAction,
    [ActionTypes.SET_SPEED]: handleSetSpeedAction,
    [ActionTypes.SET_COMMENT]: handleSetCommentAction,
    [ActionTypes.FINISH_FETCHING_SONGLE]: handleFinishFetchingSongleAction,
    [ActionTypes.FINISH_FETCHING_SCORE]: handleFinishFetchingScoreAction,
    [ActionTypes.UPDATE_NOTES]: handleUpdateNotesAction,
    [ActionTypes.ADD_BAR]: handleAddBarAction,
    [ActionTypes.REMOVE_BAR]: handleRemoveBarAction,
    [ActionTypes.UPDATE_STATE]: handleUpdateStateAction,
    [ActionTypes.RESET_PLAY]: handleResetPlayAction,
    [ActionTypes.START_FETCHING_SCORE]: handleStartFetchingScoreAction,
    [ActionTypes.START_CREATING_SCORE]: handleStartCreatingScoreAction,
    [ActionTypes.FINISH_CREATING_SCORE]: handleFinishCreatingScoreAction,
  },
  cloneDeep(initialState)
);
