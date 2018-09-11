const initialState = {
  isOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
};
