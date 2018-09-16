export const setPanes = references => ({
  type: 'SET_PANES',
  payload: {
    player: {
      width: references.player.current.offsetWidth,
      height: references.player.current.offsetHeight,
    },
    config: {
      width: references.config.current.offsetWidth,
      height: references.config.current.offsetHeight,
    },
    editor: {
      width: references.editor.current.offsetWidth,
      height: references.editor.current.offsetHeight,
    },
    palette: {
      width: references.palette.current.offsetWidth,
      height: references.palette.current.offsetHeight,
    },
  },
});

// export const setPanes = references => {
//   let panes = {};
//   Object.keys(references).forEach(key => {
//     panes[key] = {
//       width: references[key].current.offsetWidth,
//       height: references[key].current.offsetHeight,
//     };
//   });
//   return {
//     type: 'SET_PANES',
//     payload: panes,
//   };
// };
