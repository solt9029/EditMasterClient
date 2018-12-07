import React, { Component } from 'react';
import { clear, drawFireworkEffect } from '../utils/canvas';
import Canvas from '../styled/Canvas';
import PropTypes from 'prop-types';

export default class PlayerFireworkEffectsCanvas extends Component {
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
      this.props.height === nextProps.height
    ) {
      this.updateCanvas();
      return false;
    }
    return true;
  }

  updateCanvas() {
    const { width, height, fireworkEffects } = this.props;

    clear(this.ctx, width - 1, height - 1);

    for (let i = fireworkEffects.length - 1; i >= 0; i--) {
      drawFireworkEffect(
        this.ctx,
        fireworkEffects[i].y,
        fireworkEffects[i].state
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

PlayerFireworkEffectsCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fireworkEffects: PropTypes.arrayOf(PropTypes.object).isRequired,
  updatedCount: PropTypes.number.isRequired,
};
