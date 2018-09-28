const initialState = {
  isOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_SUCCESS_MODAL':
      return {
        ...state,
        isOpen: true,
      };
    case 'CLOSE_SUCCESS_MODAL':
      return initialState;
    default:
      return state;
  }
};
