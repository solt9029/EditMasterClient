import React, { Component } from 'react';
import { sizes, positions } from '../constants';
import Canvas from '../classes/Canvas';
import propTypes from 'prop-types';
import Layer from '../styled/Layer';
import {
  calcBarNum,
  calcBarWidth,
  calcEditorCanvasHeight,
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
    const { editorWidth, notesLength } = this.props;
    const height = calcEditorCanvasHeight(notesLength);
    this.canvas.clear(editorWidth - 1, height);

    const barNum = calcBarNum(notesLength);
    const barWidth = calcBarWidth(editorWidth);
    for (let i = 0; i < barNum; i++) {
      this.canvas.drawBar(
        positions.EDITOR.BAR.X,
        i * sizes.EDITOR.BAR.OUTSIDE.HEIGHT,
        barWidth
      );
    }
  }

  render() {
    const { editorWidth, notesLength } = this.props;
    const height = calcEditorCanvasHeight(notesLength);

    return (
      <Layer
        innerRef={this.canvasRef}
        width={editorWidth - 1}
        height={height}
      />
    );
  }
}

EditorBarsCanvas.propTypes = {
  editorWidth: propTypes.number,
  notesLength: propTypes.number,
};
