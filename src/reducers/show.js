const initialState = {
  error: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW/START_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'SHOW/FINISH_REQUEST_ERROR':
      const { error } = action.payload;
      return {
        ...state,
        isLoading: false,
        error,
      };
    case 'SHOW/FINISH_REQUEST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};
