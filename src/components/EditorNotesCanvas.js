import React, { Component } from 'react';
import { percentages, sizes, positions, numbers, ids } from '../constants';
import Canvas from '../classes/Canvas';
import propTypes from 'prop-types';
import Layer from '../styled/Layer';
import { calcEditorCanvasHeight } from '../utils/calculations';

export default class EditorNotesCanvas extends Component {
  canvasRef = React.createRef();
  canvas = null;

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d');
    this.canvas = new Canvas(ctx);
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const height = calcEditorCanvasHeight(this.props.notes.length);
    this.canvas.clear(this.props.width - 1, height);

    const barWidth = this.props.width - 1 - positions.EDITOR.BAR.X * 2;

    // notes
    const actualBarWidth = barWidth * (1 - percentages.EDITOR.BAR_START_LINE); // left side of initial beat line is not available
    const spaceWidth = actualBarWidth / numbers.NOTES_PER_BAR;
    const barStartLineX =
      positions.EDITOR.BAR.X + barWidth * percentages.EDITOR.BAR_START_LINE;

    for (let i = this.props.notes.length - 1; i >= 0; i--) {
      const note = this.props.notes[i];
      if (note === ids.NOTE.SPACE) {
        continue;
      }
      const c = i % numbers.NOTES_PER_BAR;
      const l = Math.floor(i / numbers.NOTES_PER_BAR);
      const x = barStartLineX + spaceWidth * c;
      const y = sizes.EDITOR.BAR.OUTSIDE.HEIGHT * (l + 0.5);
      const previousNote = i > 0 ? this.props.notes[i - 1] : ids.NOTE.SPACE;
      const nextNote =
        i < this.props.notes.length - 1
          ? this.props.notes[i + 1]
          : ids.NOTE.SPACE;

      this.canvas.drawNote(
        x,
        y,
        'EDITOR',
        note,
        spaceWidth,
        previousNote,
        nextNote
      );
    }
  }

  render() {
    const { width, notes } = this.props;
    const height = calcEditorCanvasHeight(notes.length);

    return (
      <Layer innerRef={this.canvasRef} width={width - 1} height={height} />
    );
  }
}

EditorNotesCanvas.propTypes = {
  width: propTypes.number,
  notes: propTypes.arrayOf(propTypes.number),
};
