export const startCreate = () => ({
  type: 'MODAL/START_CREATE',
});

export const finishCreateSuccess = id => ({
  type: 'MODAL/FINISH_CREATE_SUCCESS',
  payload: {
    id,
  },
});

export const finishCreateError = errors => ({
  type: 'MODAL/FINISH_CREATE_ERROR',
  payload: {
    errors,
  },
});

export const close = () => ({
  type: 'MODAL/CLOSE',
});
