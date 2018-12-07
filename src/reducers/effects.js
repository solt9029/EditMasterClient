import { ActionTypes } from '../constants/';
import { handleActions } from 'redux-actions';
import ShotEffect from '../classes/ShotEffect';
import JudgeEffect from '../classes/JudgeEffect';
import FireworkEffect from '../classes/FireworkEffect';
import BackgroundEffect from '../classes/BackgroundEffect';
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

const handleAddShotEffectAction = (
  state,
  { payload: { note, playerWidth, playerHeight } }
) => {
  state.shots.list.push(new ShotEffect(note, playerWidth, playerHeight));
  state.shots.updatedCount++;
  return state;
};

const handleAddJudgeEffectAction = (state, { payload }) => {
  state.judges.list.push(new JudgeEffect(payload.state, payload.playerHeight));
  state.judges.updatedCount++;
  return state;
};

const handleAddFireworkEffectAction = (state, { payload }) => {
  state.fireworks.list.push(
    new FireworkEffect(payload.state, payload.playerHeight)
  );
  state.fireworks.updatedCount++;
  return state;
};

const handleAddBackgroundEffectAction = (
  state,
  { payload: { isDon, playerWidth, playerHeight } }
) => {
  state.backgrounds.list.push(
    new BackgroundEffect(isDon, playerWidth, playerHeight)
  );
  state.backgrounds.updatedCount++;
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
    state[key].updatedCount++; // TODO: check how this works
  }

  return state;
};

export default handleActions(
  {
    [ActionTypes.ADD_SHOT_EFFECT]: handleAddShotEffectAction,
    [ActionTypes.ADD_JUDGE_EFFECT]: handleAddJudgeEffectAction,
    [ActionTypes.ADD_FIREWORK_EFFECT]: handleAddFireworkEffectAction,
    [ActionTypes.ADD_BACKGROUND_EFFECT]: handleAddBackgroundEffectAction,
    [ActionTypes.UPDATE_EFFECTS]: handleUpdateEffectsAction,
    [ActionTypes.RESET_IDE]: () => cloneDeep(initialState),
    [ActionTypes.RESET_PLAY]: () => cloneDeep(initialState),
  },
  cloneDeep(initialState)
);
