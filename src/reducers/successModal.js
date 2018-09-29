const initialState = {
  isOpen: false,
  id: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_SUCCESS_MODAL':
      return {
        ...state,
        isOpen: true,
        id: action.payload.id,
      };
    case 'CLOSE_SUCCESS_MODAL':
      return initialState;
    default:
      return state;
  }
};
