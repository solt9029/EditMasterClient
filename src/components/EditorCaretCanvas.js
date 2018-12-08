import React, { Component } from 'react';
import { Numbers, Keys } from '../constants';
import Canvas from '../styled/Canvas';
import { drawCaret, clear } from '../utils/canvas';
import { calcCaret, calcEditorCanvasHeight } from '../utils/calculations';
import { isNote, hasState } from '../utils/note';

export default class EditorCaretCanvas extends Component {
  state = {
    x: 0,
    y: 0,
    barIndex: 0,
    divisionIndex: 0,
  };
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
    const { barIndex } = this.state;

    switch (event.nativeEvent.key) {
      case Keys.COPY:
        this.clipboard = this.props.notes.slice(
          barIndex * Numbers.NOTES_PER_BAR,
          (barIndex + 1) * Numbers.NOTES_PER_BAR
        );
        return;
      case Keys.PASTE:
        if (!this.clipboard) {
          return;
        }
        if (this.clipboard.length !== Numbers.NOTES_PER_BAR) {
          return;
        }
        this.props.updateNotes({
          index: barIndex * Numbers.NOTES_PER_BAR,
          notes: this.clipboard,
        });
        if ((barIndex + 1) * Numbers.NOTES_PER_BAR >= this.props.notesLength) {
          this.props.addBar();
        }
        return;
      default:
        return;
    }
  };

  updateNotes = event => {
    let {
      currentDivision,
      currentNote,
      updateNotes,
      addBar,
      notesLength,
    } = this.props;
    const { barIndex, divisionIndex } = this.state;

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
    this.setState({ ...caret });
  };

  updateCanvas() {
    const { width, notesLength } = this.props;
    const height = calcEditorCanvasHeight(notesLength);
    clear(this.ctx, width - 1, height);

    const { x, y } = this.state;
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
