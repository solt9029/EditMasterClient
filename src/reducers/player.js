import constants from '../constants';
import { defaultNotes } from './editor';

const initialState = {
  isAutoMode: true,
  isChangingSlider: false,
  states: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NEW/SET_DEFAULT_SCORE': {
      const states = Array(defaultNotes.length).fill(constants.id.note.space);
      return {
        ...state,
        states,
      };
    }
    case 'SHOW/FINISH_REQUEST_SUCCESS': {
      const states = Array(defaultNotes.length).fill(constants.id.note.space);
      return {
        ...state,
        states,
      };
    }
    case 'PLAYER/SET_CHANGING_SLIDER':
      return {
        ...state,
        isChangingSlider: action.payload.isChangingSlider,
      };
    case 'PLAYER/SET_STATE': {
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
    case 'PLAYER/FRESH_STATES': {
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
    case 'PLAYER/RESET':
      return initialState;
    default:
      return state;
  }
};
