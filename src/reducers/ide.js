const initialState = {
  player: {
    width: 0,
    height: 0,
  },
  editor: {
    width: 0,
    height: 0,
  },
  palette: {
    width: 0,
    height: 0,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PANES':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
