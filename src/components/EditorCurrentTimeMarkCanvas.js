import React, { Component } from 'react';
import {
  calcEditorCanvasHeight,
  calcCurrentTimeMark,
} from '../utils/calculations';
import { clear, drawCurrentTimeMark } from '../utils/canvas';
import Canvas from '../styled/Canvas';
import propTypes from 'prop-types';

export default class EditorCurrentTimeMarkCanvas extends Component {
  canvasRef = React.createRef();
  ctx = null;

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.width === nextProps.width &&
      this.props.notesLength === nextProps.notesLength
    ) {
      this.updateCanvas();
      return false;
    }
    return true;
  }

  updateCanvas() {
    const { notesLength, width, bpm, offset, currentTime } = this.props;
    const height = calcEditorCanvasHeight(notesLength);
    clear(this.ctx, width - 1, height);

    const { x, y } = calcCurrentTimeMark(width, bpm, offset, currentTime);
    drawCurrentTimeMark(this.ctx, x, y);
  }

  render() {
    const { notesLength, width } = this.props;
    const height = calcEditorCanvasHeight(notesLength);

    return <Canvas innerRef={this.canvasRef} width={width} height={height} />;
  }
}

EditorCurrentTimeMarkCanvas.propTypes = {
  width: propTypes.number.isRequired,
  notesLength: propTypes.number.isRequired,
  bpm: propTypes.number.isRequired,
  offset: propTypes.number.isRequired,
  currentTime: propTypes.number.isRequired,
};
