import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ActionTypes } from '../constants';
import { setCaret } from './caret';
import { Numbers } from '../constants';
import * as calculations from '../utils/calculations';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('caret actions', () => {
  test('setCaret', () => {
    const store = mockStore({
      currentDivision: Numbers.DIVISIONS[0],
      sizes: { editor: { width: 1000 } },
    });
    const result = {
      x: 88.54375,
      y: 62,
      divisionIndex: 1,
      barIndex: 1,
    };
    calculations.calcCaret = jest.fn(() => result);

    store.dispatch(setCaret({ offsetX: 100, offsetY: 100 }));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: ActionTypes.SET_CARET,
      payload: result,
    });
    expect(calculations.calcCaret).toHaveBeenCalledTimes(1);
  });
});
