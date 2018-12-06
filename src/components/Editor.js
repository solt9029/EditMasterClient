import React, { Component } from 'react';
import EditorCaretCanvas from '../containers/EditorCaretCanvas';
import EditorCurrentTimeMarkCanvas from '../containers/EditorCurrentTimeMarkCanvas';
import EditorBarsCanvas from '../containers/EditorBarsCanvas';
import EditorNotesCanvas from '../containers/EditorNotesCanvas';
import propTypes from 'prop-types';

export default class Editor extends Component {
  render() {
    return (
      <div>
        <EditorBarsCanvas />
        <EditorNotesCanvas />
        <EditorCurrentTimeMarkCanvas />
        <EditorCaretCanvas />
      </div>
    );
  }
}

Editor.propTypes = {
  width: propTypes.number,
  notes: propTypes.arrayOf(propTypes.number),
};
