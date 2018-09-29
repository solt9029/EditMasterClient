export const openSuccessModal = id => ({
  type: 'OPEN_SUCCESS_MODAL',
  payload: {
    id,
  },
});

export const closeSuccessModal = () => ({
  type: 'CLOSE_SUCCESS_MODAL',
});
