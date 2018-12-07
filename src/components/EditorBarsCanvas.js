import React, { Component } from 'react';
import propTypes from 'prop-types';
import Canvas from '../styled/Canvas';
import {
  calcBarNum,
  calcEditorCanvasHeight,
  calcBarWidth,
} from '../utils/calculations';
import { drawBars, clear } from '../utils/canvas';

export default class EditorBarsCanvas extends Component {
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
    const { width, notesLength } = this.props;

    const height = calcEditorCanvasHeight(notesLength);
    clear(this.ctx, width - 1, height);

    const barNum = calcBarNum(notesLength);
    const barWidth = calcBarWidth(width);
    drawBars(this.ctx, barWidth, barNum);
  }

  render() {
    const { width, notesLength } = this.props;
    const height = calcEditorCanvasHeight(notesLength);

    return (
      <Canvas innerRef={this.canvasRef} width={width - 1} height={height} />
    );
  }
}

EditorBarsCanvas.propTypes = {
  width: propTypes.number,
  notesLength: propTypes.number,
};
