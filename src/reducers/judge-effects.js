import { ActionTypes } from '../constants/';
import JudgeEffect from '../classes/JudgeEffect';

const initialState = {
  list: [], // HACK: this is mutable for performance.
  updatedCount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.JUDGE_EFFECTS.ADD_JUDGE_EFFECT: {
      state.list.push(
        new JudgeEffect(action.payload.state, action.payload.playerHeight)
      );
      return {
        ...state,
        updatedCount: state.updatedCount + 1,
      };
    }

    case ActionTypes.JUDGE_EFFECTS.UPDATE_JUDGE_EFFECTS: {
      if (state.list.length === 0) {
        return state;
      }

      for (let i = state.list.length - 1; i >= 0; i--) {
        state.list[i].update();
        if (state.list[i].limit < 0) {
          state.list.splice(i, 1);
        }
      }
      return {
        ...state,
        updatedCount: state.updatedCount + 1,
      };
    }

    default:
      return state;
  }
};
