import { setKeyword } from './keyword';
import { ActionTypes } from '../constants';

describe('keyword actions', () => {
  test('setKeyword', () => {
    const keyword = 'aiueo';
    const result = setKeyword(keyword);
    const expected = {
      type: ActionTypes.SET_KEYWORD,
      payload: keyword,
    };
    expect(result).toEqual(expected);
  });
});
