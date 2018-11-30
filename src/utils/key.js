import { Keys } from '../constants';

/**
 *
 * @param {string} pushedKey
 */
export const isDon = pushedKey => {
  return Keys.DON.indexOf(pushedKey) >= 0;
};

/**
 *
 * @param {string} pushedKey
 */
export const isKa = pushedKey => {
  return Keys.KA.indexOf(pushedKey) >= 0;
};
