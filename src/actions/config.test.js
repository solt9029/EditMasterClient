import * as config from './config';
import { actionTypes } from '../constants/';

describe('config actions', () => {
  it('reset action', () => {
    const result = config.reset();
    const expected = {
      type: actionTypes.CONFIG.RESET,
    };
    expect(result).toEqual(expected);
  });
});
