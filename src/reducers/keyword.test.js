import reducer from './keyword';
import { setKeyword } from '../actions/keyword';

describe('keyword reducer', () => {
  test('initialState', () => {
    const state = '';
    const action = {};
    const result = reducer(state, action);
    const expected = '';
    expect(result).toEqual(expected);
  });

  test('setKeyword', () => {
    const state = 'keyword';
    const action = setKeyword('new keyword');
    const result = reducer(state, action);
    const expected = 'new keyword';
    expect(result).toEqual(expected);
  });
});
