import constants from '../constants';

export const isDon = note => {
  return (
    note === constants.id.note.don ||
    note === constants.id.note.bigdon ||
    note === constants.id.note.renda ||
    note === constants.id.note.bigrenda ||
    note === constants.id.note.balloon
  );
};

export const isKa = note => {
  return (
    note === constants.id.note.ka ||
    note === constants.id.note.bigka ||
    note === constants.id.note.renda ||
    note === constants.id.note.bigrenda
  );
};

export const hasState = note => {
  return (
    note === constants.id.note.don ||
    note === constants.id.note.ka ||
    note === constants.id.note.bigdon ||
    note === constants.id.note.bigka
  );
};

export const isNote = note => {
  return (
    note === constants.id.note.don ||
    note === constants.id.note.ka ||
    note === constants.id.note.bigdon ||
    note === constants.id.note.bigka ||
    note === constants.id.note.renda ||
    note === constants.id.note.bigrenda ||
    note === constants.id.note.balloon ||
    note === constants.id.note.space
  );
};

export default {
  isDon,
  isKa,
  hasState,
  isNote,
};
