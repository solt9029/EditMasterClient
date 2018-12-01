import { Ids, Numbers, ActionTypes } from '../constants/';
import { defaultNotes } from './editor';
import Shot from '../classes/Shot';
import JudgeEffect from '../classes/JudgeEffect';

const initialState = {
  isChangingSlider: false,
  states: [],
  shots: [], // HACK: this is mutable for performance.
  shotsUpdatedCount: 0,
  judgeEffects: [], // HACK: this is mutable for performance.
  judgeEffectsUpdatedCount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PLAYER.ADD_SHOT: {
      const { note, playerWidth, playerHeight } = action.payload;
      state.shots.push(new Shot(note, playerWidth, playerHeight));
      return {
        ...state,
        shotsUpdatedCount: state.shotsUpdatedCount + 1,
      };
    }

    case ActionTypes.PLAYER.UPDATE_SHOTS: {
      if (state.shots.length === 0) {
        return state;
      }

      for (let i = state.shots.length - 1; i >= 0; i--) {
        state.shots[i].update();
        if (state.shots[i].limit < 0) {
          state.shots.splice(i, 1);
        }
      }
      return {
        ...state,
        shotsUpdatedCount: state.shotsUpdatedCount + 1,
      };
    }

    case ActionTypes.PLAYER.ADD_JUDGE_EFFECT: {
      state.judgeEffects.push(
        new JudgeEffect(action.payload.state, action.payload.playerHeight)
      );
      return {
        ...state,
        judgeEffectsUpdatedCount: state.judgeEffectsUpdatedCount + 1,
      };
    }

    case ActionTypes.PLAYER.UPDATE_JUDGE_EFFECTS: {
      if (state.judgeEffects.length === 0) {
        return state;
      }

      for (let i = state.judgeEffects.length - 1; i >= 0; i--) {
        state.judgeEffects[i].update();
        if (state.judgeEffects[i].limit < 0) {
          state.judgeEffects.splice(i, 1);
        }
      }
      return {
        ...state,
        judgeEffectsUpdatedCount: state.judgeEffectsUpdatedCount + 1,
      };
    }

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
    case ActionTypes.PLAYER.SET_CHANGING_SLIDER:
      return {
        ...state,
        isChangingSlider: action.payload.isChangingSlider,
      };
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
    case ActionTypes.PLAYER.RESET:
      return initialState;
    default:
      return state;
  }
};
