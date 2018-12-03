import { ActionTypes } from '../constants/';

const _addShot = (note, playerWidth, playerHeight) => ({
  type: ActionTypes.SHOTS.ADD_SHOT,
  payload: {
    note,
    playerWidth,
    playerHeight,
  },
});

export const addShot = note => {
  return (dispatch, getState) => {
    const state = getState();
    const { width, height } = state.sizes.player;
    dispatch(_addShot(note, width, height));
  };
};

export const updateShots = () => ({
  type: ActionTypes.SHOTS.UPDATE_SHOTS,
});
