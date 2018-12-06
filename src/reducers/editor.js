import { Ids, ActionTypes, Numbers } from '../constants';
import { handleActions } from 'redux-actions';

const initialState = {
  currentNote: Ids.NOTE.DON,
  currentDivision: Numbers.DIVISIONS[0],
};

const handleSetCurrentNoteAction = (state, { payload }) => ({
  ...state,
  currentNote: payload,
});

const handleSetCurrentDivisionAction = (state, { payload }) => ({
  ...state,
  currentDivision: payload,
});

export default handleActions(
  {
    [ActionTypes.RESET_IDE]: () => initialState,
    [ActionTypes.SET_CURRENT_NOTE]: handleSetCurrentNoteAction,
    [ActionTypes.SET_CURRENT_DIVISION]: handleSetCurrentDivisionAction,
  },
  initialState
);
