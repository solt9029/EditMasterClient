import React, { Component } from 'react';
import Canvas from '../classes/Canvas';
import propTypes from 'prop-types';
import Layer from '../styled/Layer';
import { calcBarNum, calcEditorCanvasHeight } from '../utils/calculations';

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
    this.canvas.drawBars(editorWidth, barNum);
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
