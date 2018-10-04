export const setPanes = references => {
  let panes = {};

  for (let key in references) {
    let pane = { width: 0, height: 0 };
    if (references[key].current) {
      const { offsetWidth, offsetHeight } = references[key].current;
      pane = { width: offsetWidth, height: offsetHeight };
    }
    panes[key] = pane;
  }

  return {
    type: 'SET_PANES',
    payload: { panes },
  };
};
