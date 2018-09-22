import React, { Component } from 'react';
import { connect } from 'react-redux';
import { position, percentage, size, number } from '../../constants';
import Canvas from '../../Canvas';
import { setNoteIds } from '../../actions/editor';

const canvasInlineStyle = { position: 'absolute', top: '0', left: '0' };

class EditorCaretCanvas extends Component {
  constructor(props) {
    super(props);
    this.mouseBarIndex = 0;
    this.mouseDivisionIndex = 0;
    this.canvasRef = React.createRef();
    this.canvas = null;
    this.mouseMove = this.mouseMove.bind(this);
    this.setNoteIds = this.setNoteIds.bind(this);
  }

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d');
    this.canvas = new Canvas(ctx);
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.palette !== nextProps.palette ||
      this.props.editorPane !== nextProps.editorPane
    );
  }

  setNoteIds() {
    if (!this.props.palette) {
      return;
    }

    const notesPerDivision =
      number.score.column / this.props.palette.values.division;
    const mouseColumnIndex = this.mouseDivisionIndex * notesPerDivision;
    const index = this.mouseBarIndex * number.score.column + mouseColumnIndex;
    this.props.setNoteIds(index, 1, this.props.palette.values.note);
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
      Math.ceil(this.props.noteIds.length / number.score.column) *
        size.editor.bar.outside.height
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
        onClick={this.setNoteIds}
        ref={this.canvasRef}
        style={canvasInlineStyle}
        width={this.props.editorPane.width - 1}
        height={
          Math.ceil(this.props.noteIds.length / number.score.column) *
          size.editor.bar.outside.height
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  editorPane: state.pane.editor,
  palette: state.form.palette,
  noteIds: state.editor.noteIds,
});
const mapDispatchToProps = dispatch => ({
  setNoteIds(index, num, noteId) {
    dispatch(setNoteIds(index, num, noteId));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorCaretCanvas);
