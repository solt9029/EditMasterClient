import React, { Component } from 'react';
import Canvas from '../classes/Canvas';
import * as utils from '../utils';
import Layer from '../styled/Layer';
import propTypes from 'prop-types';

export default class EditorCurrentTimeMarkCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvas = null;
  }

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d');
    this.canvas = new Canvas(ctx);
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const { notesLength, editorWidth, bpm, offset, currentTime } = this.props;
    const height = utils.calculations.editorCanvasHeight(notesLength);
    this.canvas.clear(editorWidth - 1, height);

    const { x, y } = utils.calculations.currentTimeMark(
      editorWidth,
      bpm,
      offset,
      currentTime
    );
    this.canvas.drawCurrentTimeMark(x, y);
  }

  render() {
    const { notesLength, editorWidth } = this.props;
    const height = utils.calculations.editorCanvasHeight(notesLength);

    return (
      <Layer
        innerRef={this.canvasRef}
        width={editorWidth - 1}
        height={height}
      />
    );
  }
}

EditorCurrentTimeMarkCanvas.propTypes = {
  editorWidth: propTypes.number.isRequired,
  notesLength: propTypes.number.isRequired,
  bpm: propTypes.number.isRequired,
  offset: propTypes.number.isRequired,
  currentTime: propTypes.number.isRequired,
};
