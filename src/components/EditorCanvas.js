import React, { Component } from 'react';
import Canvas from '../styled/Canvas';

export default class EditorCanvas extends Component {
  ref = React.createRef();

  componentDidMount() {
    this.ctx = this.ref.current.getContext('2d');
    this.updateCanvas(this.props);
  }

  componentDidUpdate() {
    this.updateCanvas(this.props);
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.width === nextProps.width &&
      this.props.height === nextProps.height &&
      this.props.scroll === nextProps.scroll
    ) {
      this.updateCanvas(nextProps);
      return false;
    }
    return true;
  }

  updateCanvas(props) {}

  render() {
    const { width, height, scroll } = this.props;
    return (
      <Canvas
        innerRef={this.ref}
        width={width - 1}
        height={height - 1}
        translateY={scroll}
      />
    );
  }
}
