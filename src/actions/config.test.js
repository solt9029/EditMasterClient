import * as config from './config';
import { actionTypes } from '../constants/';
import * as utils from '../utils';

describe('config actions', () => {
  it('reset action', () => {
    const result = config.reset();
    const expected = {
      type: actionTypes.CONFIG.RESET,
    };
    expect(result).toEqual(expected);
  });

  it('setUsername action should return required error if the value is empty', () => {
    const result = config.setUsername('');
    const expected = {
      type: actionTypes.CONFIG.SET_USERNAME,
      payload: {
        value: '',
        errors: [utils.validations.required('')],
        touched: true,
      },
    };
    expect(result).toEqual(expected);
  });

  it('setUsername action should return maxLength20 error if the length of the value is more than 20', () => {
    const maxLength20 = utils.validations.maxLength(20);
    const result = config.setUsername('aaaaaaaaaaaaaaaaaaaaaaaaa');
    const expected = {
      type: actionTypes.CONFIG.SET_USERNAME,
      payload: {
        value: 'aaaaaaaaaaaaaaaaaaaaaaaaa',
        errors: [maxLength20('aaaaaaaaaaaaaaaaaaaaaaaaa')],
        touched: true,
      },
    };
    expect(result).toEqual(expected);
  });

  it('setUsername action should return no errors if the value is not empty and the length of the value is less than 20', () => {
    const result = config.setUsername('username');
    const expected = {
      type: actionTypes.CONFIG.SET_USERNAME,
      payload: {
        value: 'username',
        errors: [],
        touched: true,
      },
    };
    expect(result).toEqual(expected);
  });
});
