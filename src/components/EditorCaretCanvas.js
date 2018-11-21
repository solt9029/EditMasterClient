import React, { Component } from 'react';
import { numbers, keys } from '../constants';
import Canvas from '../classes/Canvas';
import * as utils from '../utils';
import Layer from '../styled/Layer';

export default class EditorCaretCanvas extends Component {
  constructor(props) {
    super(props);
    this.mouseBarIndex = 0;
    this.mouseDivisionIndex = 0;
    this.clipboard = null;
    this.canvasRef = React.createRef();
    this.canvas = null;
  }

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d');
    this.canvas = new Canvas(ctx);
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.editorWidth !== nextProps.editorWidth ||
      this.props.notes.length !== nextProps.notes.length ||
      this.props.palette !== nextProps.palette
    );
  }

  keyDown = event => {
    this.changeNotes(event);
    this.copyPaste(event);
  };

  copyPaste = event => {
    switch (event.nativeEvent.key) {
      case keys.COPY:
        this.clipboard = this.props.notes.slice(
          this.mouseBarIndex * numbers.NOTES_PER_BAR,
          (this.mouseBarIndex + 1) * numbers.NOTES_PER_BAR
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
          this.mouseBarIndex * numbers.NOTES_PER_BAR,
          this.clipboard
        );
        if (
          (this.mouseBarIndex + 1) * numbers.NOTES_PER_BAR >=
          this.props.notes.length
        ) {
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
      if (!utils.notes.isNote(keyValue)) {
        return;
      }
      note = keyValue;
    }

    const notesPerDivision = numbers.NOTES_PER_BAR / division;
    const mouseNotesPerBarIndex = this.mouseDivisionIndex * notesPerDivision;
    const index =
      this.mouseBarIndex * numbers.NOTES_PER_BAR + mouseNotesPerBarIndex;
    let notes = [];
    if (!utils.notes.hasState(note)) {
      for (let i = 0; i < notesPerDivision; i++) {
        notes.push(note);
      }
    } else {
      notes.push(note);
    }
    this.props.changeNotes(index, notes);

    // add one bar if the user puts a note on the last bar
    if (index >= this.props.notes.length - numbers.NOTES_PER_BAR) {
      this.props.addBar();
    }
  };

  updateCaret = event => {
    const { division } = this.props.palette;
    const width = this.props.editorWidth;
    const { offsetX, offsetY } = event.nativeEvent;

    const { divisionIndex, barIndex, x, y } = utils.calculations.caret(
      offsetX,
      offsetY,
      width,
      division
    );

    this.mouseDivisionIndex = divisionIndex;
    this.mouseBarIndex = barIndex;

    const height = utils.calculations.editorCanvasHeight(
      this.props.notes.length
    );
    this.canvas.clear(width - 1, height);

    this.canvas.drawCaret(x, y);
  };

  render() {
    const { notes, editorWidth } = this.props;
    const height = utils.calculations.editorCanvasHeight(notes.length);

    return (
      <Layer
        tabIndex={0}
        onMouseMove={this.updateCaret}
        onKeyDown={this.keyDown}
        onClick={this.changeNotes}
        innerRef={this.canvasRef}
        width={editorWidth - 1}
        height={height}
      />
    );
  }
}
