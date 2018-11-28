import { keys } from '../constants';

/**
 *
 * @param {string} pushedKey
 */
export const isDon = pushedKey => {
  return keys.DON.indexOf(pushedKey) >= 0;
};

/**
 *
 * @param {string} pushedKey
 */
export const isKa = pushedKey => {
  return keys.KA.indexOf(pushedKey) >= 0;
};
