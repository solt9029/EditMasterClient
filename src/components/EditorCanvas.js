import React, { Component } from 'react';
import Canvas from '../styled/Canvas';
import { calcEditorCanvasHeight } from '../utils/calculations';

export default class EditorCanvas extends Component {
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
      this.props.notesLength === nextProps.notesLength
    ) {
      this.updateCanvas();
      return false;
    }
    return true;
  }

  updateCanvas() {}

  render() {
    const { width, notesLength } = this.props;
    const height = calcEditorCanvasHeight(notesLength);
    return <Canvas innerRef={this.ref} width={width} height={height} />;
  }
}
