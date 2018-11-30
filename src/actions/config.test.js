import * as config from './config';
import { ActionTypes } from '../constants/';
import { required, maxLength } from '../utils/validations';

describe('config actions', () => {
  it('reset action', () => {
    const result = config.reset();
    const expected = {
      type: ActionTypes.CONFIG.RESET,
    };
    expect(result).toEqual(expected);
  });

  it('setUsername action should return required error if the value is empty', () => {
    const value = '';
    const result = config.setUsername(value);
    const expected = {
      type: ActionTypes.CONFIG.SET_USERNAME,
      payload: {
        value: value,
        errors: [required(value)],
        touched: true,
      },
    };
    expect(result).toEqual(expected);
  });

  it('setUsername action should return maxLength20 error if the length of the value is more than 20', () => {
    const value = 'aaaaaaaaaaaaaaaaaaaaaaaaa';
    const maxLength20 = maxLength(20);
    const result = config.setUsername(value);
    const expected = {
      type: ActionTypes.CONFIG.SET_USERNAME,
      payload: {
        value: value,
        errors: [maxLength20(value)],
        touched: true,
      },
    };
    expect(result).toEqual(expected);
  });

  it('setUsername action should return no errors if the value is not empty and the length of the value is less than 20', () => {
    const value = 'username';
    const result = config.setUsername(value);
    const expected = {
      type: ActionTypes.CONFIG.SET_USERNAME,
      payload: {
        value: value,
        errors: [],
        touched: true,
      },
    };
    expect(result).toEqual(expected);
  });
});
