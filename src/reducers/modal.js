import { ActionTypes } from '../constants/';

const initialState = {
  isLoading: false,
  id: 0,
  errors: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.MODAL.START_CREATE:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.MODAL.FINISH_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        id: action.payload.id,
        errors: null,
      };
    case ActionTypes.MODAL.FINISH_CREATE_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.payload.errors,
      };
    default:
      return state;
  }
};
