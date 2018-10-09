import React, { Component } from 'react';
import { connect } from 'react-redux';
import { numbers, keys, positions, percentages, sizes } from '../../constants/';
import Canvas from '../../classes/Canvas';
import { changeNotes } from '../../actions/editor';
import { addBar } from '../../actions/editor';
import * as utils from '../../utils';

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
    this.changeNotes = this.changeNotes.bind(this);
    this.copyPaste = this.copyPaste.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d');
    this.canvas = new Canvas(ctx);
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.editorPane !== nextProps.editorPane ||
      this.props.notes.length !== nextProps.notes.length ||
      this.props.palette !== nextProps.palette
    );
  }

  keyDown(event) {
    this.changeNotes(event);
    this.copyPaste(event);
  }

  copyPaste(event) {
    switch (event.nativeEvent.key) {
      case keys.COPY:
        this.clipboard = this.props.notes.slice(
          this.mouseBarIndex * numbers.NOTES_PER_BAR,
          (this.mouseBarIndex + 1) * numbers.NOTES_PER_BAR
        );
        return;
      case keys.PASTE:
        if (!this.clipboard) {
          return;
        }
        if (this.clipboard.length !== numbers.NOTES_PER_BAR) {
          return;
        }
        this.props.changeNotes(
          this.mouseBarIndex * numbers.NOTES_PER_BAR,
          this.clipboard
        );
        if (
          (this.mouseBarIndex + 1) * numbers.NOTES_PER_BAR >=
          this.props.notes.length
        ) {
          this.props.addBar();
        }
        return;
      default:
        return;
    }
  }

  changeNotes(event) {
    let { division, note } = this.props.palette;

    // if the event is key event, the note which is going to be put should be key value!
    if (event.nativeEvent.key) {
      const keyValue = +event.nativeEvent.key;
      if (!utils.notes.isNote(keyValue)) {
        return;
      }
      note = keyValue;
    }

    const notesPerDivision = numbers.NOTES_PER_BAR / division;
    const mouseNotesPerBarIndex = this.mouseDivisionIndex * notesPerDivision;
    const index =
      this.mouseBarIndex * numbers.NOTES_PER_BAR + mouseNotesPerBarIndex;
    let notes = [];
    if (!utils.notes.hasState(note)) {
      for (let i = 0; i < notesPerDivision; i++) {
        notes.push(note);
      }
    } else {
      notes.push(note);
    }
    this.props.changeNotes(index, notes);

    // add one bar if the user puts a note on the last bar
    if (index >= this.props.notes.length - numbers.NOTES_PER_BAR) {
      this.props.addBar();
    }
  }

  updateCaret(event) {
    const division = this.props.palette.division;

    // calculation
    const mouseX = event.nativeEvent.offsetX;
    const mouseY = event.nativeEvent.offsetY;
    const barWidth =
      this.props.editorPane.width - 1 - positions.EDITOR.BAR.X * 2;
    const actualBarWidth = barWidth * (1 - percentages.EDITOR.BAR_START_LINE); // left side of initial beat line is not available
    const barStartLineX =
      positions.EDITOR.BAR.X + barWidth * percentages.EDITOR.BAR_START_LINE;
    let mouseDivisionIndex = Math.round(
      (mouseX - barStartLineX) /
        ((barWidth * (1 - percentages.EDITOR.BAR_START_LINE)) / division)
    );
    if (mouseDivisionIndex < 0) {
      mouseDivisionIndex = 0;
    }
    if (mouseDivisionIndex >= division) {
      mouseDivisionIndex = division - 1;
    }
    this.mouseDivisionIndex = mouseDivisionIndex;
    this.mouseBarIndex = Math.floor(mouseY / sizes.EDITOR.BAR.OUTSIDE.HEIGHT);

    // canvas drawing
    this.canvas.clear(
      this.props.editorPane.width - 1,
      Math.ceil(this.props.notes.length / numbers.NOTES_PER_BAR) *
        sizes.EDITOR.BAR.OUTSIDE.HEIGHT
    );
    const x =
      barStartLineX +
      actualBarWidth * (this.mouseDivisionIndex / division) -
      sizes.EDITOR.CARET.WIDTH / 2;
    const y =
      this.mouseBarIndex * sizes.EDITOR.BAR.OUTSIDE.HEIGHT +
      (sizes.EDITOR.BAR.OUTSIDE.HEIGHT - sizes.EDITOR.BAR.INSIDE.HEIGHT) / 2;
    this.canvas.drawCaret(x, y);
  }

  render() {
    return (
      <canvas
        tabIndex={0}
        onMouseMove={this.updateCaret}
        onKeyDown={this.keyDown}
        onClick={this.changeNotes}
        ref={this.canvasRef}
        style={canvasInlineStyle}
        width={this.props.editorPane.width - 1}
        height={
          Math.ceil(this.props.notes.length / numbers.NOTES_PER_BAR) *
          sizes.EDITOR.BAR.OUTSIDE.HEIGHT
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  editorPane: state.ide.panes.editor,
  palette: state.palette,
  notes: state.editor.notes,
});
const mapDispatchToProps = dispatch => ({
  changeNotes(index, num, note) {
    dispatch(changeNotes(index, num, note));
  },
  addBar() {
    dispatch(addBar());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorCaretCanvas);
