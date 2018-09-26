import React, { Component } from 'react';
import { connect } from 'react-redux';
import constants from '../../constants';
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
    this.clipboard = null;
    this.canvasRef = React.createRef();
    this.canvas = null;
    this.updateCaret = this.updateCaret.bind(this);
    this.setNoteIds = this.setNoteIds.bind(this);
    this.copyPaste = this.copyPaste.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d');
    this.canvas = new Canvas(ctx);
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.paletteForm !== nextProps.paletteForm ||
      this.props.editorPane !== nextProps.editorPane ||
      this.props.noteIds.length !== nextProps.noteIds.length ||
      this.props.paletteInitialValues !== nextProps.paletteInitialValues
    );
  }

  keyDown(event) {
    this.setNoteIds(event);
    this.copyPaste(event);
  }

  copyPaste(event) {
    switch (event.key) {
      case constants.key.copy:
        this.clipboard = this.props.noteIds.slice(
          this.mouseBarIndex * constants.number.score.column,
          (this.mouseBarIndex + 1) * constants.number.score.column
        );
        return;
      case constants.key.paste:
        if (!this.clipboard) {
          return;
        }
        if (this.clipboard.length !== constants.number.score.column) {
          return;
        }
        this.props.setNoteIds(
          this.mouseBarIndex * constants.number.score.column,
          this.clipboard
        );
        if (
          (this.mouseBarIndex + 1) * constants.number.score.column >=
          this.props.noteIds.length
        ) {
          this.props.addBar();
        }
        return;
      default:
        return;
    }
  }

  setNoteIds(event) {
    let { division, note } = this.props.paletteForm
      ? this.props.paletteForm.values
      : this.props.paletteInitialValues;

    // if the event is key event, the note which is going to be put should be key value!
    if (event.key) {
      const keyValue = +event.key;
      if (!constants.id.note.isNote(keyValue)) {
        return;
      }
      note = keyValue;
    }

    const notesPerDivision = constants.number.score.column / division;
    const mouseColumnIndex = this.mouseDivisionIndex * notesPerDivision;
    const index =
      this.mouseBarIndex * constants.number.score.column + mouseColumnIndex;
    let noteIds = [];
    if (!constants.id.note.hasState(note)) {
      for (let i = 0; i < notesPerDivision; i++) {
        noteIds.push(note);
      }
    } else {
      noteIds.push(note);
    }
    this.props.setNoteIds(index, noteIds);

    // add one bar if the user puts a note on the last bar
    if (index >= this.props.noteIds.length - constants.number.score.column) {
      this.props.addBar();
    }
  }

  updateCaret(event) {
    const division = this.props.paletteForm
      ? this.props.paletteForm.values.division
      : this.props.paletteInitialValues.division;

    // calculation
    const mouseX = event.nativeEvent.offsetX;
    const mouseY = event.nativeEvent.offsetY;
    const barWidth =
      this.props.editorPane.width - 1 - constants.position.editor.bar.x * 2;
    const actualBarWidth =
      barWidth * (1 - constants.percentage.editor.barStartLine); // left side of initial beat line is not available
    const barStartLineX =
      constants.position.editor.bar.x +
      barWidth * constants.percentage.editor.barStartLine;
    let mouseDivisionIndex = Math.round(
      (mouseX - barStartLineX) /
        ((barWidth * (1 - constants.percentage.editor.barStartLine)) / division)
    );
    if (mouseDivisionIndex < 0) {
      mouseDivisionIndex = 0;
    }
    if (mouseDivisionIndex >= division) {
      mouseDivisionIndex = division - 1;
    }
    this.mouseDivisionIndex = mouseDivisionIndex;
    this.mouseBarIndex = Math.floor(
      mouseY / constants.size.editor.bar.outside.height
    );

    // canvas drawing
    this.canvas.clear(
      this.props.editorPane.width - 1,
      Math.ceil(this.props.noteIds.length / constants.number.score.column) *
        constants.size.editor.bar.outside.height
    );
    const x =
      barStartLineX +
      actualBarWidth * (this.mouseDivisionIndex / division) -
      constants.size.editor.caret.width / 2;
    const y =
      this.mouseBarIndex * constants.size.editor.bar.outside.height +
      (constants.size.editor.bar.outside.height -
        constants.size.editor.bar.inside.height) /
        2;
    this.canvas.drawCaret(x, y);
  }

  render() {
    return (
      <canvas
        onMouseMove={this.updateCaret}
        onClick={this.setNoteIds}
        ref={this.canvasRef}
        style={canvasInlineStyle}
        width={this.props.editorPane.width - 1}
        height={
          Math.ceil(this.props.noteIds.length / constants.number.score.column) *
          constants.size.editor.bar.outside.height
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  editorPane: state.pane.editor,
  paletteForm: state.form.palette,
  paletteInitialValues: state.palette,
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
