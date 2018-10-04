export const setPanes = panes => ({
  type: 'SET_PANES',
  payload: panes,
});

export const calcPanes = references => {
  return dispatch => {
    const { player, editor, palette } = references;

    let playerPane = { width: 0, height: 0 };
    if (player.current) {
      const { offsetWidth, offsetHeight } = player.current;
      playerPane = { width: offsetWidth, height: offsetHeight };
    }

    let editorPane = { width: 0, height: 0 };
    if (editor.current) {
      const { offsetWidth, offsetHeight } = editor.current;
      editorPane = { width: offsetWidth, height: offsetHeight };
    }

    let palettePane = { width: 0, height: 0 };
    if (palette.current) {
      const { offsetWidth, offsetHeight } = palette.current;
      palettePane = { width: offsetWidth, height: offsetHeight };
    }

    const panes = {
      player: playerPane,
      editor: editorPane,
      palette: palettePane,
    };

    dispatch(setPanes(panes));
  };
};
