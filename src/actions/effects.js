import { ActionTypes } from '../constants/';
import { createAction } from 'redux-actions';

const _addShotEffect = createAction(ActionTypes.ADD_SHOT_EFFECT);
const _addJudgeEffect = createAction(ActionTypes.ADD_JUDGE_EFFECT);
export const updateEffects = createAction(ActionTypes.UPDATE_EFFECTS);

export const addShotEffect = note => {
  return (dispatch, getState) => {
    const { width, height } = getState().sizes.player;
    const payload = { note, playerWidth: width, playerHeight: height };
    dispatch(_addShotEffect(payload));
  };
};

export const addJudgeEffect = state => {
  return (dispatch, getState) => {
    const { height } = getState().sizes.player;
    const payload = { state, playerHeight: height };
    dispatch(_addJudgeEffect(payload));
  };
};
