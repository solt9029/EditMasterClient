import { Ids, Numbers, ActionTypes } from '../constants/';
import { defaultNotes } from './editor';
import { handleActions } from 'redux-actions';

const initialState = {
  states: [],
};

export default handleActions(
  {
    [ActionTypes.SET_DEFAULT_SCORE]: () => ({
      states: Array(defaultNotes.length).fill(Ids.NOTE.SPACE),
    }),
    [ActionTypes.FINISH_FETCHING_SCORE]: {
      next: (state, { payload }) => ({
        states: Array(payload.notes.length).fill(Ids.NOTE.SPACE),
      }),
    },
    [ActionTypes.UPDATE_STATE]: (state, { payload }) => {
      let states = state.states.concat();
      states[payload.index] = payload.state;
      return {
        ...state,
        states,
      };
    },

    [ActionTypes.RESET_PLAY]: state => {
      let states = state.states.concat();
      for (let i = 0; i < states.length; i++) {
        states[i] = Ids.STATE.FRESH;
      }
      return {
        states,
      };
    },

    [ActionTypes.ADD_BAR]: state => {
      let states = state.states.concat();
      for (let i = 0; i < Numbers.NOTES_PER_BAR; i++) {
        states.push(Ids.NOTE.SPACE);
      }
      return {
        ...state,
        states,
      };
    },

    [ActionTypes.REMOVE_BAR]: state => {
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
    },

    [ActionTypes.RESET_IDE]: () => initialState,
  },
  initialState
);
