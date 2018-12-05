import { ActionTypes } from '../constants/';
import { handleActions } from 'redux-actions';

const defaultState = {
  username: { value: '通りすがりの創作の達人', errors: [] },
  videoId: { value: 'jhOVibLEDhA', errors: [] },
  bpm: { value: 158, errors: [] },
  offset: { value: 0.75, errors: [] },
  comment: { value: '創作の達人で創作譜面をしました！', errors: [] },
  speed: { value: 1, errors: [] },
};

const initialState = {
  username: { value: '', errors: [] },
  videoId: { value: '', errors: [] },
  bpm: { value: 0, errors: [] },
  offset: { value: 0, errors: [] },
  comment: { value: '', errors: [] },
  speed: { value: 0, errors: [] },
};

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

const handleFinishFetchingScoreAction = (
  state,
  { payload: { username, videoId, bpm, offset, comment, speed } }
) => ({
  ...state,
  username: { value: username, errors: [] },
  videoId: { value: videoId, errors: [] },
  bpm: { value: bpm, errors: [] },
  offset: { value: offset, errors: [] },
  comment: { value: comment, errors: [] },
  speed: { value: speed, errors: [] },
});

export default handleActions(
  {
    [ActionTypes.SET_DEFAULT_SCORE]: () => defaultState,
    [ActionTypes.FINISH_FETCHING_SCORE]: {
      next: handleFinishFetchingScoreAction,
    },
    [ActionTypes.FINISH_FETCHING_SONGLE]: handleFinishFetchingSongleAction,
    [ActionTypes.RESET_IDE]: () => initialState,
    [ActionTypes.SET_USERNAME]: handleSetUsernameAction,
    [ActionTypes.SET_VIDEO_ID]: handleSetVideoIdAction,
    [ActionTypes.SET_BPM]: handleSetBpmAction,
    [ActionTypes.SET_OFFSET]: handleSetOffsetAction,
    [ActionTypes.SET_SPEED]: handleSetSpeedAction,
    [ActionTypes.SET_COMMENT]: handleSetCommentAction,
  },
  initialState
);
