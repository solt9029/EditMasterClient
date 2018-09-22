import React, { Component } from 'react';
import { connect } from 'react-redux';
import { position, percentage, size } from '../../constants';
import Canvas from '../../Canvas';

const canvasInlineStyle = { position: 'absolute', top: '0', left: '0' };

class EditorCaretCanvas extends Component {
  constructor(props) {
    super(props);
    this.mouseBarIndex = 0;
    this.mouseDivisionIndex = 0;
    this.canvasRef = React.createRef();
    this.canvas = null;
    this.mouseMove = this.mouseMove.bind(this);
  }

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d');
    this.canvas = new Canvas(ctx);
  }

  mouseMove(event) {
    if (!this.props.palette) {
      return;
    }

    // calculation
    const mouseX = event.nativeEvent.offsetX;
    const mouseY = event.nativeEvent.offsetY;
    const barWidth =
      this.props.editorPane.width - 1 - position.editor.bar.x * 2;
    const actualBarWidth = barWidth * (1 - percentage.editor.barStartLine); // left side of initial beat line is not available
    const barStartLineX =
      position.editor.bar.x + barWidth * percentage.editor.barStartLine;
    let mouseDivisionIndex = Math.round(
      (mouseX - barStartLineX) /
        ((barWidth * (1 - percentage.editor.barStartLine)) /
          this.props.palette.values.division)
    );
    if (mouseDivisionIndex < 0) {
      mouseDivisionIndex = 0;
    }
    if (mouseDivisionIndex >= this.props.palette.values.division) {
      mouseDivisionIndex = this.props.palette.values.division - 1;
    }
    this.mouseDivisionIndex = mouseDivisionIndex;
    this.mouseBarIndex = Math.floor(mouseY / size.editor.bar.outside.height);

    // canvas drawing
    this.canvas.clear(
      this.props.editorPane.width - 1,
      this.props.editorPane.height - 1
    );
    const x =
      barStartLineX +
      actualBarWidth *
        (this.mouseDivisionIndex / this.props.palette.values.division) -
      size.editor.caret.width / 2;
    const y =
      this.mouseBarIndex * size.editor.bar.outside.height +
      (size.editor.bar.outside.height - size.editor.bar.inside.height) / 2 -
      2;
    this.canvas.drawCaret(x, y);
  }

  render() {
    return (
      <canvas
        onMouseMove={this.mouseMove}
        ref={this.canvasRef}
        style={canvasInlineStyle}
        width={this.props.editorPane.width - 1}
        height={this.props.editorPane.height - 1}
      />
    );
  }
}

const mapStateToProps = state => ({
  editorPane: state.pane.editor,
  palette: state.form.palette,
});
export default connect(
  mapStateToProps,
  null
)(EditorCaretCanvas);
