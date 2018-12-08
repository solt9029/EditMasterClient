import React from 'react';
import EditorCaretCanvas from '../containers/EditorCaretCanvas';
import EditorCurrentTimeMarkCanvas from '../containers/EditorCurrentTimeMarkCanvas';
import EditorBarsCanvas from '../containers/EditorBarsCanvas';
import EditorNotesCanvas from '../containers/EditorNotesCanvas';
import PropTypes from 'prop-types';
import { Keys } from '../constants';

const Editor = ({ updateNotes, setCaret, copy, paste }) => {
  const onClick = () => updateNotes();

  const onMouseMove = event => {
    const { offsetX, offsetY } = event.nativeEvent;
    setCaret({ offsetX, offsetY });
  };

  const onKeyDown = event => {
    const { key } = event.nativeEvent;
    updateNotes(key);
    if (key === Keys.COPY) {
      copy();
    } else if (key === Keys.PASTE) {
      paste();
    }
  };

  return (
    <div
      tabIndex={0}
      onMouseMove={onMouseMove}
      onKeyDown={onKeyDown}
      onClick={onClick}
    >
      <EditorBarsCanvas />
      <EditorNotesCanvas />
      <EditorCurrentTimeMarkCanvas />
      <EditorCaretCanvas />
    </div>
  );
};

export default Editor;

Editor.propTypes = {
  updateNotes: PropTypes.func.isRequired,
  setCaret: PropTypes.func.isRequired,
  copy: PropTypes.func.isRequired,
  paste: PropTypes.func.isRequired,
};
