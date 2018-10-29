import React, { Component } from 'react';
import { numbers, sizes, positions, percentages } from '../constants';
import Canvas from '../classes/Canvas';
import * as utils from '../utils';

const canvasInlineStyle = { position: 'absolute', top: '0', left: '0' };

export default class EditorCurrentTimeCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvas = null;
  }

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d');
    this.canvas = new Canvas(ctx);
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.editorPane !== nextProps.editorPane ||
      this.props.notes.length !== nextProps.notes.length ||
      this.props.currentTime !== nextProps.currentTime ||
      this.props.bpm !== nextProps.bpm ||
      this.props.offset !== nextProps.offset
    );
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    this.canvas.clear(
      this.props.editorPane.width - 1,
      Math.ceil(this.props.notes.length / numbers.NOTES_PER_BAR) *
        sizes.EDITOR.BAR.OUTSIDE.HEIGHT
    );

    const barWidth =
      this.props.editorPane.width - 1 - positions.EDITOR.BAR.X * 2;
    const actualBarWidth = barWidth * (1 - percentages.EDITOR.BAR_START_LINE); // left side of initial beat line is not available
    const spaceWidth = actualBarWidth / numbers.NOTES_PER_BAR;

    const currentNoteIndexFloat =
      (this.props.currentTime - this.props.offset) /
      utils.calculations.secondsPerNote(this.props.bpm);
    const currentNotesPerBarIndexFloat =
      currentNoteIndexFloat % numbers.NOTES_PER_BAR;
    const currentBarIndex = Math.floor(
      currentNoteIndexFloat / numbers.NOTES_PER_BAR
    );

    const y =
      currentBarIndex * sizes.EDITOR.BAR.OUTSIDE.HEIGHT +
      (sizes.EDITOR.BAR.OUTSIDE.HEIGHT - sizes.EDITOR.BAR.INSIDE.HEIGHT) / 2;
    const x = currentNotesPerBarIndexFloat * spaceWidth;
    this.canvas.drawCurrentTime(x, y);
  }

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        style={canvasInlineStyle}
        width={this.props.editorPane.width - 1}
        height={
          Math.ceil(this.props.notes.length / numbers.NOTES_PER_BAR) *
          sizes.EDITOR.BAR.OUTSIDE.HEIGHT
        }
      />
    );
  }
}
