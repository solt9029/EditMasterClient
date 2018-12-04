import React, { Component } from 'react';
import EditorCaretCanvas from '../containers/EditorCaretCanvas';
import EditorCurrentTimeMarkCanvas from '../containers/EditorCurrentTimeMarkCanvas';
import EditorBarsCanvas from './EditorBarsCanvas';
import EditorNotesCanvas from './EditorNotesCanvas';
import propTypes from 'prop-types';

export default class Editor extends Component {
  render() {
    const { width, notes } = this.props;

    return (
      <div>
        <EditorBarsCanvas width={width} notesLength={notes.length} />
        <EditorNotesCanvas width={width} notes={notes} />
        <EditorCurrentTimeMarkCanvas width={width} />
        <EditorCaretCanvas width={width} />
      </div>
    );
  }
}

Editor.propTypes = {
  width: propTypes.number,
  notes: propTypes.arrayOf(propTypes.number),
};
