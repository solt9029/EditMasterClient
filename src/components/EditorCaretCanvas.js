import React, { Component } from 'react';
import { Numbers, Keys } from '../constants';
import Layer from '../styled/Layer';
import { drawCaret, clear } from '../utils/canvas';
import { calcCaret, calcEditorCanvasHeight } from '../utils/calculations';
import { isNote, hasState } from '../utils/note';

export default class EditorCaretCanvas extends Component {
  mouseX = 0;
  mouseY = 0;
  clipboard = null;
  canvasRef = React.createRef();
  ctx = null;

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
  }

  keyDown = event => {
    this.changeNotes(event);
    this.copyPaste(event);
  };

  copyPaste = event => {
    const { barIndex } = calcCaret(
      this.mouseX,
      this.mouseY,
      this.props.width,
      this.props.palette.division
    );

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
        this.props.changeNotes(
          barIndex * Numbers.NOTES_PER_BAR,
          this.clipboard
        );
        if ((barIndex + 1) * Numbers.NOTES_PER_BAR >= this.props.notesLength) {
          this.props.addBar();
        }
        return;
      default:
        return;
    }
  };

  changeNotes = event => {
    let { division, note } = this.props.palette;

    // if the event is key event, the note which is going to be put should be key value!
    if (event.nativeEvent.key) {
      const keyValue = +event.nativeEvent.key;
      if (!isNote(keyValue)) {
        return;
      }
      note = keyValue;
    }

    const { barIndex, divisionIndex } = calcCaret(
      this.mouseX,
      this.mouseY,
      this.props.width,
      this.props.palette.division
    );

    const notesPerDivision = Numbers.NOTES_PER_BAR / division;
    const mouseNotesPerBarIndex = divisionIndex * notesPerDivision;
    const index = barIndex * Numbers.NOTES_PER_BAR + mouseNotesPerBarIndex;
    let notes = [];
    if (!hasState(note)) {
      for (let i = 0; i < notesPerDivision; i++) {
        notes.push(note);
      }
    } else {
      notes.push(note);
    }
    this.props.changeNotes(index, notes);

    // add one bar if the user puts a note on the last bar
    if (index >= this.props.notesLength - Numbers.NOTES_PER_BAR) {
      this.props.addBar();
    }
  };

  updateCaret = event => {
    const { offsetX, offsetY } = event.nativeEvent;
    this.mouseX = offsetX;
    this.mouseY = offsetY;

    const height = calcEditorCanvasHeight(this.props.notesLength);
    clear(this.ctx, this.props.width - 1, height);

    const { x, y } = calcCaret(
      this.mouseX,
      this.mouseY,
      this.props.width,
      this.props.palette.division
    );
    drawCaret(this.ctx, x, y);
  };

  render() {
    const { notesLength, width } = this.props;
    const height = calcEditorCanvasHeight(notesLength);

    return (
      <Layer
        tabIndex={0}
        onMouseMove={this.updateCaret}
        onKeyDown={this.keyDown}
        onClick={this.changeNotes}
        innerRef={this.canvasRef}
        width={width - 1}
        height={height}
      />
    );
  }
}
