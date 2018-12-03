const ActionTypes = {
  SET_SIZES: 'SET_SIZES',
  SET_IS_SLIDER_CHANGING: 'SET_IS_SLIDER_CHANGING',
  START_FETCHING_SCORES: 'START_FETCHING_SCORES',
  FINISH_FETCHING_SCORES: 'FINISH_FETCHING_SCORES',
  RESET_SCORES: 'RESET_SCORES',
  SET_KEYWORD: 'SET_KEYWORD',
  ADD_SHOT_EFFECT: 'ADD_SHOT_EFFECT',
  ADD_JUDGE_EFFECT: 'ADD_JUDGE_EFFECT',
  UPDATE_EFFECTS: 'UPDATE_EFFECTS',
  CONFIG: {
    RESET: 'CONFIG/RESET',
    SET_USERNAME: 'CONFIG/SET_USERNAME',
    SET_VIDEO_ID: 'CONFIG/SET_VIDEO_ID',
    SET_BPM: 'CONFIG/SET_BPM',
    SET_OFFSET: 'CONFIG/SET_OFFSET',
    SET_SPEED: 'CONFIG/SET_SPEED',
    SET_COMMENT: 'CONFIG/SET_COMMENT',
  },
  EDITOR: {
    CHANGE_NOTES: 'EDITOR/CHANGE_NOTES',
    SET_NOTES: 'EDITOR/SET_NOTES',
    RESET: 'EDITOR/RESET',
    ADD_BAR: 'EDITOR/ADD_BAR',
    REMOVE_BAR: 'EDITOR/REMOVE_BAR',
  },
  MODAL: {
    START_CREATE: 'MODAL/START_CREATE',
    FINISH_CREATE_SUCCESS: 'MODAL/FINISH_CREATE_SUCCESS',
    FINISH_CREATE_ERROR: 'MODAL/FINISH_CREATE_ERROR',
  },
  NAVBAR: {
    SET_KEYWORD: 'NAVBAR/SET_KEYWORD',
  },
  PALETTE: {
    SET_NOTE: 'PALETTE/SET_NOTE',
    SET_DIVISION: 'PALETTE/SET_DIVISION',
    RESET: 'PALETTE/RESET',
    TOGGLE_MODE: 'PALETTE/TOGGLE_MODE',
  },
  PLAYER: {
    SET_STATE: 'PLAYER/SET_STATE',
    FRESH_STATES: 'PLAYER/FRESH_STATES',
    RESET: 'PLAYER/RESET',
  },
  JUDGE_EFFECTS: {
    ADD_JUDGE_EFFECT: 'PLAYER/ADD_JUDGE_EFFECT',
    UPDATE_JUDGE_EFFECTS: 'PLAYER/UPDATE_JUDGE_EEFECTS',
  },
  SHOTS: {
    ADD_SHOT: 'SHOTS/ADD_SHOT',
    UPDATE_SHOTS: 'SHOTS/UPDATE_SHOTS',
  },
  SCORES_NEW_VIEW: {
    SET_DEFAULT_SCORE: 'SCORES_NEW_VIEW/SET_DEFAULT_SCORE',
  },
  SCORES_SHOW_VIEW: {
    FINISH_REQUEST_ERROR: 'SCORES_SHOW_VIEW/FINISH_REQUEST_ERROR',
    START_REQUEST: 'SCORES_SHOW_VIEW/START_REQUEST',
    FINISH_REQUEST_SUCCESS: 'SCORES_SHOW_VIEW/FINISH_REQUEST_SUCCESS',
    RESET: 'SCORES_SHOW_VIEW/RESET',
  },
  YOUTUBE: {
    SET_YT_PLAYER: 'YOUTUBE/SET_YT_PLAYER',
    SET_YT_PLAYER_STATE: 'YOUTUBE/SET_YT_PLAYER_STATE',
    SET_CURRENT_TIME: 'YOUTUBE/SET_CURRENT_TIME',
    RESET: 'YOUTUBE/RESET',
  },
};

export default ActionTypes;
