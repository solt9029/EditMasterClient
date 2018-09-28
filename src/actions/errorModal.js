export const openErrorModal = errors => ({
  type: 'OPEN_ERROR_MODAL',
  payload: {
    errors,
  },
});

export const closeErrorModal = () => ({
  type: 'CLOSE_ERROR_MODAL',
});
