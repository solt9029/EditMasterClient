import React, { Component } from 'react';
import { clear, drawJudgeEffect } from '../utils/canvas';
import Canvas from '../styled/Canvas';
import PropTypes from 'prop-types';

export default class PlayerJudgeEffectsCanvas extends Component {
  judgeEffects = [];
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
      this.props.width === nextProps.height &&
      this.props.height === nextProps.height
    ) {
      this.updateCanvas();
      return false;
    }
    return true;
  }

  updateCanvas() {
    const { width, height, judgeEffects } = this.props;

    clear(this.ctx, width - 1, height - 1);

    for (let i = judgeEffects.length - 1; i >= 0; i--) {
      drawJudgeEffect(
        this.ctx,
        judgeEffects[i].judgeMarkY,
        judgeEffects[i].judgeTextY,
        judgeEffects[i].state
      );
    }
  }

  render() {
    const { width, height } = this.props;

    return (
      <Canvas innerRef={this.canvasRef} width={width - 1} height={height - 1} />
    );
  }
}

PlayerJudgeEffectsCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  judgeEffects: PropTypes.arrayOf(PropTypes.object).isRequired,
  judgeEffectsUpdatedCount: PropTypes.number.isRequired,
};
