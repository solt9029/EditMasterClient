import React, { Component } from 'react';
import { clear, drawNote } from '../utils/canvas';
import Canvas from '../styled/Canvas';
import PropTypes from 'prop-types';

export default class PlayerShotsCanvas extends Component {
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
    const { width, height, shots } = this.props;

    clear(this.ctx, width, height);

    for (let i = shots.length - 1; i >= 0; i--) {
      drawNote(this.ctx, shots[i].x, shots[i].y, 'PLAYER', shots[i].note);
    }
  }

  render() {
    const { width, height } = this.props;

    return <Canvas innerRef={this.canvasRef} width={width} height={height} />;
  }
}

PlayerShotsCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  shots: PropTypes.arrayOf(PropTypes.object).isRequired,
  updatedCount: PropTypes.number.isRequired,
};
