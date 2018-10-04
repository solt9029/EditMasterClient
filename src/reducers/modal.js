const initialState = {
  isOpen: false,
  isLoading: false,
  id: 0,
  errors: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MODAL/START_CREATE':
      return {
        ...state,
        isOpen: true,
        isLoading: true,
      };
    case 'MODAL/FINISH_CREATE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        id: action.payload.id,
        errors: null,
      };
    case 'MODAL/FINISH_CREATE_ERROR':
      return {
        ...state,
        isLoading: false,
        errors: action.payload.errors,
      };
    case 'MODAL/CLOSE':
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};
