import React, { Component } from 'react';
import Canvas from '../classes/Canvas';
import {
  calcEditorCanvasHeight,
  calcCurrentTimeMark,
} from '../utils/calculations';
import Layer from '../styled/Layer';
import propTypes from 'prop-types';

export default class EditorCurrentTimeMarkCanvas extends Component {
  canvasRef = React.createRef();
  canvas = null;

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d');
    this.canvas = new Canvas(ctx);
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const { notesLength, width, bpm, offset, currentTime } = this.props;
    const height = calcEditorCanvasHeight(notesLength);
    this.canvas.clear(width - 1, height);

    const { x, y } = calcCurrentTimeMark(width, bpm, offset, currentTime);
    this.canvas.drawCurrentTimeMark(x, y);
  }

  render() {
    const { notesLength, width } = this.props;
    const height = calcEditorCanvasHeight(notesLength);

    return (
      <Layer innerRef={this.canvasRef} width={width - 1} height={height} />
    );
  }
}

EditorCurrentTimeMarkCanvas.propTypes = {
  width: propTypes.number.isRequired,
  notesLength: propTypes.number.isRequired,
  bpm: propTypes.number.isRequired,
  offset: propTypes.number.isRequired,
  currentTime: propTypes.number.isRequired,
};
