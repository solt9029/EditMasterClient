import React, { Component } from 'react';
import { numbers, keys } from '../constants';
import Canvas from '../classes/Canvas';
import * as utils from '../utils';
import Layer from '../styled/Layer';

export default class EditorCaretCanvas extends Component {
  mouseX = 0;
  mouseY = 0;
  clipboard = null;
  canvasRef = React.createRef();
  canvas = null;

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d');
    this.canvas = new Canvas(ctx);
  }

  keyDown = event => {
    this.changeNotes(event);
    this.copyPaste(event);
  };

  copyPaste = event => {
    const { barIndex } = utils.calculations.calcCaret(
      this.mouseX,
      this.mouseY,
      this.props.width,
      this.props.palette.division
    );

    switch (event.nativeEvent.key) {
      case keys.COPY:
        this.clipboard = this.props.notes.slice(
          barIndex * numbers.NOTES_PER_BAR,
          (barIndex + 1) * numbers.NOTES_PER_BAR
        );
        return;
      case keys.PASTE:
        if (!this.clipboard) {
          return;
        }
        if (this.clipboard.length !== numbers.NOTES_PER_BAR) {
          return;
        }
        this.props.changeNotes(
          barIndex * numbers.NOTES_PER_BAR,
          this.clipboard
        );
        if ((barIndex + 1) * numbers.NOTES_PER_BAR >= this.props.notesLength) {
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
      if (!utils.note.isNote(keyValue)) {
        return;
      }
      note = keyValue;
    }

    const { barIndex, divisionIndex } = utils.calculations.calcCaret(
      this.mouseX,
      this.mouseY,
      this.props.width,
      this.props.palette.division
    );

    const notesPerDivision = numbers.NOTES_PER_BAR / division;
    const mouseNotesPerBarIndex = divisionIndex * notesPerDivision;
    const index = barIndex * numbers.NOTES_PER_BAR + mouseNotesPerBarIndex;
    let notes = [];
    if (!utils.note.hasState(note)) {
      for (let i = 0; i < notesPerDivision; i++) {
        notes.push(note);
      }
    } else {
      notes.push(note);
    }
    this.props.changeNotes(index, notes);

    // add one bar if the user puts a note on the last bar
    if (index >= this.props.notesLength - numbers.NOTES_PER_BAR) {
      this.props.addBar();
    }
  };

  updateCaret = event => {
    const { offsetX, offsetY } = event.nativeEvent;
    this.mouseX = offsetX;
    this.mouseY = offsetY;

    const height = utils.calculations.calcEditorCanvasHeight(
      this.props.notesLength
    );
    this.canvas.clear(this.props.width - 1, height);

    const { x, y } = utils.calculations.calcCaret(
      this.mouseX,
      this.mouseY,
      this.props.width,
      this.props.palette.division
    );
    this.canvas.drawCaret(x, y);
  };

  render() {
    const { notesLength, width } = this.props;
    const height = utils.calculations.calcEditorCanvasHeight(notesLength);

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
