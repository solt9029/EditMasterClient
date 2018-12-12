import React, { Component } from 'react';
import Canvas from '../styled/Canvas';
import { calcEditorCanvasHeight } from '../utils/calculations';

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
      this.props.notesLength === nextProps.notesLength
    ) {
      this.updateCanvas(nextProps);
      return false;
    }
    return true;
  }

  updateCanvas(props) {}

  render() {
    const { width, notesLength } = this.props;
    const height = calcEditorCanvasHeight(notesLength);
    return <Canvas innerRef={this.ref} width={width} height={height} />;
  }
}
