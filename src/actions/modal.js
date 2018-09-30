export const startCreate = () => ({
  type: 'START_CREATE',
});

export const successCreate = id => ({
  type: 'SUCCESS_CREATE',
  payload: {
    id,
  },
});

export const failCreate = errors => ({
  type: 'FAIL_CREATE',
  payload: {
    errors,
  },
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL',
});
