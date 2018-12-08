import React, { Component } from 'react';
import { Keys } from '../constants';
import Canvas from '../styled/Canvas';
import { drawCaret, clear } from '../utils/canvas';
import { calcEditorCanvasHeight } from '../utils/calculations';

export default class EditorCaretCanvas extends Component {
  canvasRef = React.createRef();
  ctx = null;

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  onKeyDown = event => {
    const { key } = event.nativeEvent;
    const { updateNotes, copy, paste } = this.props;
    updateNotes(key);
    if (key === Keys.COPY) {
      copy();
    } else if (key === Keys.PASTE) {
      paste();
    }
  };

  onClick = () => {
    this.props.updateNotes();
  };

  onMouseMove = event => {
    const { offsetX, offsetY } = event.nativeEvent;
    this.props.setCaret({ offsetX, offsetY });
  };

  updateCanvas() {
    const { width, notesLength } = this.props;
    const height = calcEditorCanvasHeight(notesLength);
    clear(this.ctx, width - 1, height);

    const { x, y } = this.props;
    drawCaret(this.ctx, x, y);
  }

  render() {
    const { notesLength, width } = this.props;
    const height = calcEditorCanvasHeight(notesLength);

    return (
      <Canvas
        tabIndex={0}
        onMouseMove={this.onMouseMove}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        innerRef={this.canvasRef}
        width={width}
        height={height}
      />
    );
  }
}
