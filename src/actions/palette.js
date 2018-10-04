export const setNote = note => ({
  type: 'PALETTE/SET_NOTE',
  payload: {
    note: +note,
  },
});

export const setDivision = division => ({
  type: 'PALETTE/SET_DIVISION',
  payload: {
    division: +division,
  },
});

export const reset = () => ({
  type: 'PALETTE/RESET',
});
