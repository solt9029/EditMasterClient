import React, { Component } from 'react';
import { numbers, sizes } from '../constants';
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
      this.props.editorPane !== nextProps.editorPane ||
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
    const height = utils.calculations.editorCanvasHeight(
      this.props.notes.length
    );
    this.canvas.clear(this.props.editorPane.width - 1, height);

    const { x, y } = utils.calculations.currentTimeMark(
      this.props.editorPane.width,
      this.props.bpm,
      this.props.offset,
      this.props.currentTime
    );
    this.canvas.drawCurrentTimeMark(x, y);
  }

  render() {
    const height = utils.calculations.editorCanvasHeight(
      this.props.notes.length
    );

    return (
      <canvas
        ref={this.canvasRef}
        style={canvasInlineStyle}
        width={this.props.editorPane.width - 1}
        height={height}
      />
    );
  }
}
