import { createAction } from 'redux-actions';
import { ActionTypes } from '../constants';

export const setIsSliderChanging = createAction(
  ActionTypes.SET_IS_SLIDER_CHANGING
);
