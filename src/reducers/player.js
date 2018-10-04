import constants from '../constants';

const initialState = {
  ytPlayer: null,
  ytPlayerState: constants.id.youtube.unstarted,
  currentTime: 0,
  isAutoMode: true,
  isChangingSlider: false,
  states: [],
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
    case 'SET_YTPLAYER_STATE':
      return {
        ...state,
        ytPlayerState: action.payload.ytPlayerState,
      };
    case 'SET_STATE': {
      let states = state.states.concat();
      states[action.payload.index] = action.payload.state;
      return {
        ...state,
        states,
      };
    }
    case 'EDITOR/SET_NOTES': {
      const states = Array(action.payload.notes.length).fill(
        constants.id.note.space
      );
      return {
        ...state,
        states,
      };
    }
    case 'RESET_STATE': {
      let states = state.states.concat();
      for (let i = 0; i < states.length; i++) {
        states[i] = constants.id.state.fresh;
      }
      return {
        ...state,
        states,
      };
    }
    case 'EDITOR/ADD_BAR': {
      let states = state.states.concat();
      for (let i = 0; i < constants.number.notesPerBar; i++) {
        states.push(constants.id.note.space);
      }
      return {
        ...state,
        states,
      };
    }
    case 'EDITOR/REMOVE_BAR': {
      if (state.states.length < constants.number.notesPerBar * 2) {
        return state;
      }
      const states = state.states.slice(
        0,
        state.states.length - constants.number.notesPerBar
      );
      return {
        ...state,
        states,
      };
    }
    case 'RESET_STATES':
      return {
        ...state,
        states: [],
      };
    default:
      return state;
  }
};
