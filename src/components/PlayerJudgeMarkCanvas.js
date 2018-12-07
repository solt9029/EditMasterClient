import React, { Component } from 'react';
import { clear, drawJudgeMark } from '../utils/canvas';
import Canvas from '../styled/Canvas';
import propTypes from 'prop-types';

export default class PlayerJudgeMarkCanvas extends Component {
  canvasRef = React.createRef();
  ctx = null;

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const { width, height } = this.props;

    clear(this.ctx, width, height);
    drawJudgeMark(this.ctx, (height - 1) / 2);
  }

  render() {
    const { width, height } = this.props;

    return <Canvas innerRef={this.canvasRef} width={width} height={height} />;
  }
}

PlayerJudgeMarkCanvas.propTypes = {
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
};
