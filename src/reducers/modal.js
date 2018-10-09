import { actionTypes } from '../constants/';

const initialState = {
  isOpen: false,
  isLoading: false,
  id: 0,
  errors: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODAL.START_CREATE:
      return {
        ...state,
        isOpen: true,
        isLoading: true,
      };
    case actionTypes.MODAL.FINISH_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        id: action.payload.id,
        errors: null,
      };
    case actionTypes.MODAL.FINISH_CREATE_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.payload.errors,
      };
    case actionTypes.MODAL.CLOSE:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};
