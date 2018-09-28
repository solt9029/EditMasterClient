export const setPaletteNote = note => ({
  type: 'SET_PALETTE_NOTE',
  payload: {
    note: +note,
  },
});

export const setPaletteDivision = division => ({
  type: 'SET_PALETTE_DIVISION',
  payload: {
    division: +division,
  },
});
