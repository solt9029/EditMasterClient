import { Ids, Numbers, ActionTypes } from '../constants/';
import { defaultNotes } from './editor';

const initialState = {
  states: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SCORES_NEW_VIEW.SET_DEFAULT_SCORE: {
      const states = Array(defaultNotes.length).fill(Ids.NOTE.SPACE);
      return {
        ...state,
        states,
      };
    }
    case ActionTypes.SCORES_SHOW_VIEW.FINISH_REQUEST_SUCCESS: {
      const states = Array(action.payload.notes.length).fill(Ids.NOTE.SPACE);
      return {
        ...state,
        states,
      };
    }
    case ActionTypes.PLAYER.SET_STATE: {
      let states = state.states.concat();
      states[action.payload.index] = action.payload.state;
      return {
        ...state,
        states,
      };
    }
    case ActionTypes.EDITOR.SET_NOTES: {
      const states = Array(action.payload.notes.length).fill(Ids.NOTE.SPACE);
      return {
        ...state,
        states,
      };
    }
    case ActionTypes.PLAYER.FRESH_STATES: {
      let states = state.states.concat();
      for (let i = 0; i < states.length; i++) {
        states[i] = Ids.STATE.FRESH;
      }
      return {
        ...state,
        states,
      };
    }
    case ActionTypes.EDITOR.ADD_BAR: {
      let states = state.states.concat();
      for (let i = 0; i < Numbers.NOTES_PER_BAR; i++) {
        states.push(Ids.NOTE.SPACE);
      }
      return {
        ...state,
        states,
      };
    }
    case ActionTypes.EDITOR.REMOVE_BAR: {
      if (state.states.length < Numbers.NOTES_PER_BAR * 2) {
        return state;
      }
      const states = state.states.slice(
        0,
        state.states.length - Numbers.NOTES_PER_BAR
      );
      return {
        ...state,
        states,
      };
    }
    case ActionTypes.RESET_IDE:
      return initialState;
    default:
      return state;
  }
};
