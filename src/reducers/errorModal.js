const initialState = {
  isOpen: false,
  errors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_ERROR_MODAL':
      return {
        ...state,
        isOpen: true,
        errors: action.payload.errors,
      };
    case 'CLOSE_ERROR_MODAL':
      return initialState;
    default:
      return state;
  }
};
