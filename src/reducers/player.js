import { id, number } from '../constants';

let noteStates = [];
for (let i = 0; i < 96 * 15; i++) {
  noteStates.push(id.state.fresh);
}

const initialState = {
  ytPlayer: null,
  ytPlayerState: id.youtube.unstarted,
  currentTime: 0,
  isAutoMode: true,
  isChangingSlider: false,
  secondsPerNote: 1,
  noteStates,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_YTPLAYER':
      return {
        ...state,
        ytPlayer: action.payload.ytPlayer,
      };
    case 'SET_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.payload.currentTime,
      };
    case 'TOGGLE_MODE':
      return {
        ...state,
        isAutoMode: !state.isAutoMode,
      };
    case 'SET_CHANGING_SLIDER':
      return {
        ...state,
        isChangingSlider: action.payload.isChangingSlider,
      };
    case 'SET_SECONDS_PER_NOTE':
      return {
        ...state,
        secondsPerNote: action.payload.secondsPerNote,
      };
    case 'SET_YTPLAYER_STATE':
      return {
        ...state,
        ytPlayerState: action.payload.ytPlayerState,
      };
    case 'SET_STATE': {
      let noteStates = state.noteStates.concat();
      noteStates[action.payload.index] = action.payload.state;
      return {
        ...state,
        noteStates,
      };
    }
    case 'RESET_STATE': {
      let noteStates = state.noteStates.concat();
      for (let i = 0; i < noteStates.length; i++) {
        noteStates[i] = id.state.fresh;
      }
      return {
        ...state,
        noteStates,
      };
    }
    case 'ADD_STATE_BAR': {
      let noteStates = state.noteStates.concat();
      for (let i = 0; i < number.score.column; i++) {
        noteStates.push(id.note.space);
      }
      return {
        ...state,
        noteStates,
      };
    }
    default:
      return state;
  }
};
