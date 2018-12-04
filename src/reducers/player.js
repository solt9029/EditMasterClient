import { Ids, Numbers, ActionTypes } from '../constants/';
import { defaultNotes } from './editor';
import { handleActions } from 'redux-actions';

const initialState = {
  states: [],
};

export default handleActions(
  {
    [ActionTypes.SCORES_NEW_VIEW.SET_DEFAULT_SCORE]: () => ({
      states: Array(defaultNotes.length).fill(Ids.NOTE.SPACE),
    }),
    [ActionTypes.FINISH_FETCHING_SCORE]: {
      next: (state, { payload }) => ({
        states: Array(payload.notes.length).fill(Ids.NOTE.SPACE),
      }),
    },
    [ActionTypes.PLAYER.SET_STATE]: (state, { payload }) => {
      let states = state.states.concat();
      states[payload.index] = payload.state;
      return {
        ...state,
        states,
      };
    },

    [ActionTypes.EDITOR.SET_NOTES]: (state, { payload }) => ({
      states: Array(payload.notes.length).fill(Ids.NOTE.SPACE),
    }),

    [ActionTypes.PLAYER.FRESH_STATES]: state => {
      let states = state.states.concat();
      for (let i = 0; i < states.length; i++) {
        states[i] = Ids.STATE.FRESH;
      }
      return {
        states,
      };
    },

    [ActionTypes.EDITOR.ADD_BAR]: state => {
      let states = state.states.concat();
      for (let i = 0; i < Numbers.NOTES_PER_BAR; i++) {
        states.push(Ids.NOTE.SPACE);
      }
      return {
        ...state,
        states,
      };
    },

    [ActionTypes.EDITOR.REMOVE_BAR]: state => {
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

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case ActionTypes.SCORES_NEW_VIEW.SET_DEFAULT_SCORE: {
//       const states = Array(defaultNotes.length).fill(Ids.NOTE.SPACE);
//       return {
//         ...state,
//         states,
//       };
//     }
//     case ActionTypes.FINISH_FETCHING_SCORE: {
//       const states = Array(action.payload.notes.length).fill(Ids.NOTE.SPACE);
//       return {
//         ...state,
//         states,
//       };
//     }
//     case ActionTypes.PLAYER.SET_STATE: {
//       let states = state.states.concat();
//       states[action.payload.index] = action.payload.state;
//       return {
//         ...state,
//         states,
//       };
//     }
//     case ActionTypes.EDITOR.SET_NOTES: {
//       const states = Array(action.payload.notes.length).fill(Ids.NOTE.SPACE);
//       return {
//         ...state,
//         states,
//       };
//     }
//     case ActionTypes.PLAYER.FRESH_STATES: {
//       let states = state.states.concat();
//       for (let i = 0; i < states.length; i++) {
//         states[i] = Ids.STATE.FRESH;
//       }
//       return {
//         ...state,
//         states,
//       };
//     }
//     case ActionTypes.EDITOR.ADD_BAR: {
//       let states = state.states.concat();
//       for (let i = 0; i < Numbers.NOTES_PER_BAR; i++) {
//         states.push(Ids.NOTE.SPACE);
//       }
//       return {
//         ...state,
//         states,
//       };
//     }
//     case ActionTypes.EDITOR.REMOVE_BAR: {
//       if (state.states.length < Numbers.NOTES_PER_BAR * 2) {
//         return state;
//       }
//       const states = state.states.slice(
//         0,
//         state.states.length - Numbers.NOTES_PER_BAR
//       );
//       return {
//         ...state,
//         states,
//       };
//     }
//     case ActionTypes.RESET_IDE:
//       return initialState;
//     default:
//       return state;
//   }
// };
