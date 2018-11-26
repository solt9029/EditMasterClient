import React, { Component } from 'react';
import EditorCaretCanvas from '../containers/EditorCaretCanvas';
import EditorCurrentTimeMarkCanvas from '../containers/EditorCurrentTimeMarkCanvas';
import EditorBarsCanvas from './EditorBarsCanvas';
import EditorNotesCanvas from './EditorNotesCanvas';
import propTypes from 'prop-types';

export default class Editor extends Component {
  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const { width, notes } = this.props;

    return (
      <div>
        <EditorBarsCanvas width={width} notesLength={notes.length} />
        <EditorNotesCanvas width={width} notes={notes} />
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
