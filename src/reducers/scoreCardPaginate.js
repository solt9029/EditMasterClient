const initialState = {
  data: [],
  currentPage: 0,
  from: 0,
  lastPage: 0,
  perPage: 0,
  total: 0,
  to: 0,
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SCORE_CARD_PAGINATE/START_REQUEST':
      return {
        ...initialState,
        isLoading: true,
        error: null,
      };
    case 'SCORE_CARD_PAGINATE/FINISH_REQUEST_SUCCESS':
      const {
        data,
        current_page,
        from,
        last_page,
        per_page,
        total,
        to,
      } = action.payload.data;
      return {
        ...state,
        data,
        currentPage: current_page,
        from,
        lastPage: last_page,
        perPage: per_page,
        total,
        to,
        isLoading: false,
        error: null,
      };
    case 'SCORE_CARD_PAGINATE/FINISH_REQUEST_ERROR':
      const { error } = action.payload;
      return {
        ...state,
        isLoading: false,
        error,
      };
    case 'SCORE_CARD_PAGINATE/RESET':
      return initialState;
    default:
      return state;
  }
};
