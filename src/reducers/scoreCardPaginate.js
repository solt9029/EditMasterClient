const initialState = {
  data: [],
  currentPage: 0,
  from: 0,
  lastPage: 0,
  perPage: 0,
  total: 0,
  to: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload.data,
        currentPage: action.payload.current_page,
        from: action.payload.from,
        lastPage: action.payload.last_page,
        perPage: action.payload.per_page,
        total: action.payload.total,
        to: action.payload.to,
      };
    default:
      return state;
  }
};
