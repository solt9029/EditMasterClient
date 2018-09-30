const initialState = {
  isOpen: false,
  isLoading: false,
  id: 0,
  errors: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START_CREATE':
      return {
        ...state,
        isOpen: true,
        isLoading: true,
      };
    case 'SUCCESS_CREATE':
      return {
        ...state,
        isLoading: false,
        id: action.payload.id,
        errors: null,
      };
    case 'FAIL_CREATE':
      return {
        ...state,
        isLoading: false,
        errors: action.payload.errors,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};
