import constants from '../constants';

let noteStates = [];
for (let i = 0; i < 96 * 15; i++) {
  noteStates.push(constants.id.state.fresh);
}

const initialState = {
  ytPlayer: null,
  ytPlayerState: constants.id.youtube.unstarted,
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
        noteStates[i] = constants.id.state.fresh;
      }
      return {
        ...state,
        noteStates,
      };
    }
    case 'ADD_STATE_BAR': {
      let noteStates = state.noteStates.concat();
      for (let i = 0; i < constants.number.notesPerBar; i++) {
        noteStates.push(constants.id.note.space);
      }
      return {
        ...state,
        noteStates,
      };
    }
    case 'REMOVE_STATE_BAR': {
      if (state.noteStates.length < constants.number.notesPerBar * 2) {
        return state;
      }
      const noteStates = state.noteStates.slice(
        0,
        state.noteStates.length - constants.number.notesPerBar
      );
      return {
        ...state,
        noteStates,
      };
    }
    default:
      return state;
  }
};
