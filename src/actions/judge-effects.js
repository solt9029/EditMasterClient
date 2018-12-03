import { ActionTypes } from '../constants/';

const _addJudgeEffect = (state, playerHeight) => ({
  type: ActionTypes.JUDGE_EFFECTS.ADD_JUDGE_EFFECT,
  payload: {
    state,
    playerHeight,
  },
});

export const addJudgeEffect = state => {
  return (dispatch, getState) => {
    const { height } = getState().sizes.player;
    dispatch(_addJudgeEffect(state, height));
  };
};

export const updateJudgeEffects = () => ({
  type: ActionTypes.JUDGE_EFFECTS.UPDATE_JUDGE_EFFECTS,
});
