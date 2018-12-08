import { ActionTypes, Numbers } from '../constants';
import { createAction } from 'redux-actions';

export const _copy = createAction(ActionTypes.COPY);

export const copy = () => {
  return (dispatch, getState) => {
    const { caret, score } = getState();

    const begin = caret.barIndex * Numbers.NOTES_PER_BAR;
    const end = begin + Numbers.NOTES_PER_BAR;
    const payload = score.notes.list.slice(begin, end);
    dispatch(_copy(payload));
  };
};
