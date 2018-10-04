const initialState = {
  panes: {
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
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'IDE/SET_PANES':
      return {
        ...state,
        panes: action.payload.panes,
      };
    default:
      return state;
  }
};
