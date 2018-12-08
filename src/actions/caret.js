import { ActionTypes } from '../constants';
import { createAction } from 'redux-actions';
import { calcCaret } from '../utils/calculations';

const _setCaret = createAction(ActionTypes.SET_CARET);

export const setCaret = ({ offsetX, offsetY }) => {
  return (dispatch, getState) => {
    const { currentDivision, sizes } = getState();
    const payload = calcCaret(
      offsetX,
      offsetY,
      sizes.editor.width,
      currentDivision
    );
    dispatch(_setCaret(payload));
  };
};
