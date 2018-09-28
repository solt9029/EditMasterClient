const initialState = {
  notFound: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NOT_FOUND':
      return {
        ...state,
        notFound: true,
      };
    case 'RESET_NOT_FOUND':
      return {
        ...state,
        notFound: false,
      };
    default:
      return state;
  }
};
