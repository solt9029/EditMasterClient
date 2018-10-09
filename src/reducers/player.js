import { ids, numbers, actionTypes } from '../constants/';
import { defaultNotes } from './editor';

const initialState = {
  isChangingSlider: false,
  states: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SCORES_NEW_VIEW.SET_DEFAULT_SCORE: {
      const states = Array(defaultNotes.length).fill(ids.NOTE.SPACE);
      return {
        ...state,
        states,
      };
    }
    case actionTypes.SCORES_SHOW_VIEW.FINISH_REQUEST_SUCCESS: {
      const states = Array(action.payload.notes.length).fill(ids.NOTE.SPACE);
      return {
        ...state,
        states,
      };
    }
    case actionTypes.PLAYER.SET_CHANGING_SLIDER:
      return {
        ...state,
        isChangingSlider: action.payload.isChangingSlider,
      };
    case actionTypes.PLAYER.SET_STATE: {
      let states = state.states.concat();
      states[action.payload.index] = action.payload.state;
      return {
        ...state,
        states,
      };
    }
    case actionTypes.EDITOR.SET_NOTES: {
      const states = Array(action.payload.notes.length).fill(ids.NOTE.SPACE);
      return {
        ...state,
        states,
      };
    }
    case actionTypes.PLAYER.FRESH_STATES: {
      let states = state.states.concat();
      for (let i = 0; i < states.length; i++) {
        states[i] = ids.STATE.FRESH;
      }
      return {
        ...state,
        states,
      };
    }
    case actionTypes.EDITOR.ADD_BAR: {
      let states = state.states.concat();
      for (let i = 0; i < numbers.NOTES_PER_BAR; i++) {
        states.push(ids.NOTE.SPACE);
      }
      return {
        ...state,
        states,
      };
    }
    case actionTypes.EDITOR.REMOVE_BAR: {
      if (state.states.length < numbers.NOTES_PER_BAR * 2) {
        return state;
      }
      const states = state.states.slice(
        0,
        state.states.length - numbers.NOTES_PER_BAR
      );
      return {
        ...state,
        states,
      };
    }
    case actionTypes.PLAYER.RESET:
      return initialState;
    default:
      return state;
  }
};
