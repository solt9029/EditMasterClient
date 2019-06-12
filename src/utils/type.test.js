import { toNumber } from './type';

describe('type utils', () => {
  test('toNumber', () => {
    const result = toNumber('100');
    const expected = 'number';
    expect(typeof result).toEqual(expected);
  });
});
