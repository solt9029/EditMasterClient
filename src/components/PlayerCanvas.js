import React, { Component } from 'react';
import Canvas from '../styled/Canvas';

export default class PlayerCanvas extends Component {
  ref = React.createRef();

  componentDidMount() {
    this.ctx = this.ref.current.getContext('2d');
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

  updateCanvas() {}

  render() {
    const { width, height } = this.props;

    return <Canvas innerRef={this.ref} width={width} height={height} />;
  }
}
