import { ActionTypes } from '../constants/';
import { createAction } from 'redux-actions';

const _addShotEffect = createAction(ActionTypes.ADD_SHOT_EFFECT);
const _addJudgeEffect = createAction(ActionTypes.ADD_JUDGE_EFFECT);
const _addFireworkEffect = createAction(ActionTypes.ADD_FIREWORK_EFFECT);
const _addBackgroundEffect = createAction(ActionTypes.ADD_BACKGROUND_EFFECT);
export const updateEffects = createAction(ActionTypes.UPDATE_EFFECTS);

/**
 *
 * @param {boolean} isDon
 */
export const addBackgroundEffect = isDon => {
  return (dispatch, getState) => {
    const { width, height } = getState().sizes.player;
    const payload = { isDon, playerWidth: width, playerHeight: height };
    dispatch(_addBackgroundEffect(payload));
  };
};

/**
 *
 * @param {number} state
 */
export const addFireworkEffect = state => {
  return (dispatch, getState) => {
    const { height } = getState().sizes.player;
    const payload = { state, playerHeight: height };
    dispatch(_addFireworkEffect(payload));
  };
};

/**
 *
 * @param {number} note
 */
export const addShotEffect = note => {
  return (dispatch, getState) => {
    const { width, height } = getState().sizes.player;
    const payload = { note, playerWidth: width, playerHeight: height };
    dispatch(_addShotEffect(payload));
  };
};

/**
 *
 * @param {number} state
 */
export const addJudgeEffect = state => {
  return (dispatch, getState) => {
    const { height } = getState().sizes.player;
    const payload = { state, playerHeight: height };
    dispatch(_addJudgeEffect(payload));
  };
};
