import React, { Component } from 'react';
import Canvas from '../classes/Canvas';
import propTypes from 'prop-types';
import Layer from '../styled/Layer';
import {
  calcBarNum,
  calcEditorCanvasHeight,
  calcBarWidth,
} from '../utils/calculations';

export default class EditorBarsCanvas extends Component {
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
    const { width, notesLength } = this.props;

    const height = calcEditorCanvasHeight(notesLength);
    this.canvas.clear(width - 1, height);

    const barNum = calcBarNum(notesLength);
    const barWidth = calcBarWidth(width);
    this.canvas.drawBars(barWidth, barNum);
  }

  render() {
    const { width, notesLength } = this.props;
    const height = calcEditorCanvasHeight(notesLength);

    return (
      <Layer innerRef={this.canvasRef} width={width - 1} height={height} />
    );
  }
}

EditorBarsCanvas.propTypes = {
  width: propTypes.number,
  notesLength: propTypes.number,
};
