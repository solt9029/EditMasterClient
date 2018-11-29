import { ids } from '../constants';

/**
 *
 * @param {number} note
 * @return {boolean}
 */
export const isDon = note => {
  return (
    note === ids.NOTE.DON ||
    note === ids.NOTE.BIGDON ||
    note === ids.NOTE.RENDA ||
    note === ids.NOTE.BIGRENDA ||
    note === ids.NOTE.BALLOON
  );
};

/**
 *
 * @param {number} note
 * @return {boolean}
 */
export const isKa = note => {
  return (
    note === ids.NOTE.KA ||
    note === ids.NOTE.BIGKA ||
    note === ids.NOTE.RENDA ||
    note === ids.NOTE.BIGRENDA
  );
};

/**
 *
 * @param {number} note
 * @return {boolean}
 */
export const hasState = note => {
  return (
    note === ids.NOTE.DON ||
    note === ids.NOTE.KA ||
    note === ids.NOTE.BIGDON ||
    note === ids.NOTE.BIGKA
  );
};

/**
 *
 * @param {number} note
 * @return {boolean}
 */
export const isNote = note => {
  return (
    note === ids.NOTE.DON ||
    note === ids.NOTE.KA ||
    note === ids.NOTE.BIGDON ||
    note === ids.NOTE.BIGKA ||
    note === ids.NOTE.RENDA ||
    note === ids.NOTE.BIGRENDA ||
    note === ids.NOTE.BALLOON ||
    note === ids.NOTE.SPACE
  );
};
