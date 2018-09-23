import React, { Component } from 'react';
import { connect } from 'react-redux';
import { position, percentage, size, number, id } from '../../constants';
import Canvas from '../../Canvas';
import { setNoteIds } from '../../actions/editor';
import { addStateBar } from '../../actions/player';
import { addIdBar } from '../../actions/editor';

const canvasInlineStyle = {
  position: 'absolute',
  top: '0',
  left: '0',
  outline: 'none',
};

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
      this.props.editorPane !== nextProps.editorPane ||
      this.props.noteIds.length !== nextProps.noteIds.length
    );
  }

  setNoteIds(event) {
    if (!this.props.palette) {
      return;
    }

    let { division, note } = this.props.palette.values;
    // if the event is key event, the note which is going to be put should be key value!
    if (event.nativeEvent.key) {
      note = +event.nativeEvent.key;
    }

    const notesPerDivision = number.score.column / division;
    const mouseColumnIndex = this.mouseDivisionIndex * notesPerDivision;
    const index = this.mouseBarIndex * number.score.column + mouseColumnIndex;
    let num = 1;
    if (
      note === id.note.renda ||
      note === id.note.bigrenda ||
      note === id.note.balloon ||
      note === id.note.space
    ) {
      num = notesPerDivision;
    }
    this.props.setNoteIds(index, num, note);

    // add one bar if the user puts a note on the last bar
    if (index >= this.props.noteIds.length - number.score.column) {
      this.props.addBar();
    }
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
        tabIndex="0"
        onKeyDown={this.setNoteIds}
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
  addBar() {
    dispatch(addStateBar());
    dispatch(addIdBar());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorCaretCanvas);
