import { ids } from '../constants';

export const isDon = note => {
  return (
    note === ids.NOTE.DON ||
    note === ids.NOTE.BIGDON ||
    note === ids.NOTE.RENDA ||
    note === ids.NOTE.BIGRENDA ||
    note === ids.NOTE.BALLOON
  );
};

export const isKa = note => {
  return (
    note === ids.NOTE.KA ||
    note === ids.NOTE.BIGKA ||
    note === ids.NOTE.RENDA ||
    note === ids.NOTE.BIGRENDA
  );
};

export const hasState = note => {
  return (
    note === ids.NOTE.DON ||
    note === ids.NOTE.KA ||
    note === ids.NOTE.BIGDON ||
    note === ids.NOTE.BIGKA
  );
};

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

export default {
  isDon,
  isKa,
  hasState,
  isNote,
};
