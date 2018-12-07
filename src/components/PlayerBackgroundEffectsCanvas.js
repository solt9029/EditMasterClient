import React, { Component } from 'react';
import { clear, drawBackgroundEffect } from '../utils/canvas';
import Canvas from '../styled/Canvas';
import PropTypes from 'prop-types';

export default class PlayerBackgroundEffectsCanvas extends Component {
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
    const { width, height, backgroundEffects } = this.props;

    clear(this.ctx, width - 1, height - 1);

    for (let i = backgroundEffects.length - 1; i >= 0; i--) {
      drawBackgroundEffect(
        this.ctx,
        backgroundEffects[i].isDon,
        backgroundEffects[i].playerWidth,
        backgroundEffects[i].playerHeight
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

PlayerBackgroundEffectsCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  backgroundEffects: PropTypes.arrayOf(PropTypes.object).isRequired,
  updatedCount: PropTypes.number.isRequired,
};
