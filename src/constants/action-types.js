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
  SET_YT_PLAYER: 'SET_YT_PLAYER',
  SET_CURRENT_TIME: 'SET_CURRENT_TIME',
  RESET_IDE: 'RESET_IDE',
  RESET_PLAY: 'RESET_PLAY',
  START_FETCHING_SCORE: 'START_FETCHING_SCORE',
  FINISH_FETCHING_SCORE: 'FINISH_FETCHING_SCORE',
  SET_DEFAULT_SCORE: 'SET_DEFAULT_SCORE',
  SET_USERNAME: 'SET_USERNAME',
  SET_VIDEO_ID: 'SET_VIDEO_ID',
  SET_BPM: 'SET_BPM',
  SET_OFFSET: 'SET_OFFSET',
  SET_SPEED: 'SET_SPEED',
  SET_COMMENT: 'SET_COMMENT',
  FINISH_FETCHING_SONGLE: 'FINISH_FETCHING_SONGLE',
  START_CREATING_SCORE: 'START_CREATING_SCORE',
  FINISH_CREATING_SCORE: 'FINISH_CREATING_SCORE',
  EDITOR: {
    CHANGE_NOTES: 'EDITOR/CHANGE_NOTES',
    ADD_BAR: 'EDITOR/ADD_BAR',
    REMOVE_BAR: 'EDITOR/REMOVE_BAR',
  },
  PALETTE: {
    SET_NOTE: 'PALETTE/SET_NOTE',
    SET_DIVISION: 'PALETTE/SET_DIVISION',
    TOGGLE_MODE: 'PALETTE/TOGGLE_MODE',
  },
  PLAYER: {
    SET_STATE: 'PLAYER/SET_STATE',
    FRESH_STATES: 'PLAYER/FRESH_STATES',
  },
  YOUTUBE: {
    SET_YT_PLAYER: 'YOUTUBE/SET_YT_PLAYER',
    SET_YT_PLAYER_STATE: 'YOUTUBE/SET_YT_PLAYER_STATE',
    SET_CURRENT_TIME: 'YOUTUBE/SET_CURRENT_TIME',
  },
};

export default ActionTypes;
