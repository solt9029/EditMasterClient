import { ActionTypes } from '../constants/';

const _addShot = (note, playerWidth, playerHeight) => ({
  type: ActionTypes.PLAYER.ADD_SHOT,
  payload: {
    note,
    playerWidth,
    playerHeight,
  },
});

export const addShot = note => {
  return (dispatch, getState) => {
    const state = getState();
    const { width, height } = state.ide.panes.player;
    dispatch(_addShot(note, width, height));
  };
};

export const updateShots = () => ({
  type: ActionTypes.PLAYER.UPDATE_SHOTS,
});

export const setChangingSlider = isChangingSlider => ({
  type: ActionTypes.PLAYER.SET_CHANGING_SLIDER,
  payload: {
    isChangingSlider,
  },
});

export const setState = (index, state) => ({
  type: ActionTypes.PLAYER.SET_STATE,
  payload: {
    index,
    state,
  },
});

export const freshStates = () => ({
  type: ActionTypes.PLAYER.FRESH_STATES,
});

export const reset = () => ({
  type: ActionTypes.PLAYER.RESET,
});
