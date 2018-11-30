import { Ids } from '../constants';

/**
 *
 * @param {number} note
 * @return {boolean}
 */
export const isDon = note => {
  return (
    note === Ids.NOTE.DON ||
    note === Ids.NOTE.BIGDON ||
    note === Ids.NOTE.RENDA ||
    note === Ids.NOTE.BIGRENDA ||
    note === Ids.NOTE.BALLOON
  );
};

/**
 *
 * @param {number} note
 * @return {boolean}
 */
export const isKa = note => {
  return (
    note === Ids.NOTE.KA ||
    note === Ids.NOTE.BIGKA ||
    note === Ids.NOTE.RENDA ||
    note === Ids.NOTE.BIGRENDA
  );
};

/**
 *
 * @param {number} note
 * @return {boolean}
 */
export const hasState = note => {
  return (
    note === Ids.NOTE.DON ||
    note === Ids.NOTE.KA ||
    note === Ids.NOTE.BIGDON ||
    note === Ids.NOTE.BIGKA
  );
};

/**
 *
 * @param {number} note
 * @return {boolean}
 */
export const isNote = note => {
  return (
    note === Ids.NOTE.DON ||
    note === Ids.NOTE.KA ||
    note === Ids.NOTE.BIGDON ||
    note === Ids.NOTE.BIGKA ||
    note === Ids.NOTE.RENDA ||
    note === Ids.NOTE.BIGRENDA ||
    note === Ids.NOTE.BALLOON ||
    note === Ids.NOTE.SPACE
  );
};
