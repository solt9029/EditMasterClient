import React, { Component } from 'react';
import Canvas from '../classes/Canvas';
import * as utils from '../utils';

const canvasInlineStyle = { position: 'absolute', top: '0', left: '0' };

export default class EditorCurrentTimeMarkCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvas = null;
  }

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d');
    this.canvas = new Canvas(ctx);
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.editorWidth !== nextProps.editorWidth ||
      this.props.notes.length !== nextProps.notes.length ||
      this.props.currentTime !== nextProps.currentTime ||
      this.props.bpm !== nextProps.bpm ||
      this.props.offset !== nextProps.offset
    );
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const { notes, editorWidth, bpm, offset, currentTime } = this.props;
    const height = utils.calculations.editorCanvasHeight(notes.length);
    this.canvas.clear(editorWidth - 1, height);

    const { x, y } = utils.calculations.currentTimeMark(
      editorWidth,
      bpm,
      offset,
      currentTime
    );
    this.canvas.drawCurrentTimeMark(x, y);
  }

  render() {
    const { notes, editorWidth } = this.props;
    const height = utils.calculations.editorCanvasHeight(notes.length);

    return (
      <canvas
        ref={this.canvasRef}
        style={canvasInlineStyle}
        width={editorWidth - 1}
        height={height}
      />
    );
  }
}
