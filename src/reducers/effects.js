import { ActionTypes } from '../constants/';
import { handleActions } from 'redux-actions';
import Shot from '../classes/Shot';
import JudgeEffect from '../classes/JudgeEffect';
import { cloneDeep } from 'lodash';

// HACK: this is mutable for performance!
const initialState = {
  judges: {
    list: [],
    updatedCount: 0,
  },
  fireworks: {
    list: [],
    updatedCount: 0,
  },
  shots: {
    list: [],
    updatedCount: 0,
  },
  backgrounds: {
    list: [],
    updatedCount: 0,
  },
};

const handleAddShotEffectAction = (state, { payload }) => {
  state.shots.list.push(
    new Shot(payload.note, payload.playerWidth, payload.playerHeight)
  );
  state.shots.updatedCount++;
  return state;
};

const handleAddJudgeEffectAction = (state, { payload }) => {
  state.judges.list.push(new JudgeEffect(payload.state, payload.playerHeight));
  state.judges.updatedCount++;
  return state;
};

const handleUpdateEffectsAction = state => {
  for (let key in state) {
    if (state[key].list.length <= 0) {
      continue;
    }

    for (let i = state[key].list.length - 1; i >= 0; i--) {
      state[key].list[i].update();
      if (state[key].list[i].limit < 0) {
        state[key].list.splice(i, 1);
      }
    }
    state[key].updatedCount++;
  }

  return state;
};

export default handleActions(
  {
    [ActionTypes.ADD_SHOT_EFFECT]: handleAddShotEffectAction,
    [ActionTypes.ADD_JUDGE_EFFECT]: handleAddJudgeEffectAction,
    [ActionTypes.UPDATE_EFFECTS]: handleUpdateEffectsAction,
    [ActionTypes.RESET_IDE]: () => cloneDeep(initialState),
    [ActionTypes.RESET_PLAY]: () => cloneDeep(initialState),
  },
  cloneDeep(initialState)
);
