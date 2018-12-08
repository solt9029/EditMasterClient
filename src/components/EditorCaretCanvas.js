import React, { Component } from 'react';
import { Numbers, Keys } from '../constants';
import Canvas from '../styled/Canvas';
import { drawCaret, clear } from '../utils/canvas';
import { calcCaret, calcEditorCanvasHeight } from '../utils/calculations';
import { isNote, hasState } from '../utils/note';

export default class EditorCaretCanvas extends Component {
  clipboard = null;
  canvasRef = React.createRef();
  ctx = null;

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  keyDown = event => {
    this.updateNotes(event);
    this.copyPaste(event);
  };

  copyPaste = event => {
    const { key } = event.nativeEvent;
    const { copy, paste } = this.props;
    if (key === Keys.COPY) {
      copy();
    } else if (key === Keys.PASTE) {
      paste();
    }
  };

  updateNotes = event => {
    let {
      currentDivision,
      currentNote,
      updateNotes,
      addBar,
      notesLength,
      barIndex,
      divisionIndex,
    } = this.props;

    // if the event is key event, the note which is going to be put should be key value!
    if (event.nativeEvent.key) {
      const keyValue = +event.nativeEvent.key;
      if (!isNote(keyValue)) {
        return;
      }
      currentNote = keyValue;
    }

    const notesPerDivision = Numbers.NOTES_PER_BAR / currentDivision;
    const mouseNotesPerBarIndex = divisionIndex * notesPerDivision;
    const index = barIndex * Numbers.NOTES_PER_BAR + mouseNotesPerBarIndex;
    let notes = [];
    if (!hasState(currentNote)) {
      for (let i = 0; i < notesPerDivision; i++) {
        notes.push(currentNote);
      }
    } else {
      notes.push(currentNote);
    }
    updateNotes({ index, notes });

    // add one bar if the user puts a note on the last bar
    if (index >= notesLength - Numbers.NOTES_PER_BAR) {
      addBar();
    }
  };

  onMouseMove = event => {
    const { offsetX, offsetY } = event.nativeEvent;
    const { width, currentDivision } = this.props;
    const caret = calcCaret(offsetX, offsetY, width, currentDivision);
    this.props.setCaret(caret);
  };

  updateCanvas() {
    const { width, notesLength } = this.props;
    const height = calcEditorCanvasHeight(notesLength);
    clear(this.ctx, width - 1, height);

    const { x, y } = this.props;
    drawCaret(this.ctx, x, y);
  }

  render() {
    const { notesLength, width } = this.props;
    const height = calcEditorCanvasHeight(notesLength);

    return (
      <Canvas
        tabIndex={0}
        onMouseMove={this.onMouseMove}
        onKeyDown={this.keyDown}
        onClick={this.updateNotes}
        innerRef={this.canvasRef}
        width={width - 1}
        height={height}
      />
    );
  }
}
