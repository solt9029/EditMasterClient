export const setState = (index, state) => ({
  type: 'SET_STATE',
  payload: {
    index,
    state,
  },
});

export const resetState = () => ({
  type: 'RESET_STATE',
});

export const setMousePosition = (x, y) => ({
  type: 'SET_MOUSE_POSITION',
  payload: {
    x,
    y,
  },
});
