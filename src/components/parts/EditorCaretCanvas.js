import React, { Component } from 'react';
import { connect } from 'react-redux';
import constants from '../../constants';
import Canvas from '../../Canvas';
import { changeNotes } from '../../actions/editor';
import { addBar } from '../../actions/editor';

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
      case constants.key.copy:
        this.clipboard = this.props.notes.slice(
          this.mouseBarIndex * constants.number.notesPerBar,
          (this.mouseBarIndex + 1) * constants.number.notesPerBar
        );
        return;
      case constants.key.paste:
        if (!this.clipboard) {
          return;
        }
        if (this.clipboard.length !== constants.number.notesPerBar) {
          return;
        }
        this.props.changeNotes(
          this.mouseBarIndex * constants.number.notesPerBar,
          this.clipboard
        );
        if (
          (this.mouseBarIndex + 1) * constants.number.notesPerBar >=
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
      if (!constants.id.note.isNote(keyValue)) {
        return;
      }
      note = keyValue;
    }

    const notesPerDivision = constants.number.notesPerBar / division;
    const mouseNotesPerBarIndex = this.mouseDivisionIndex * notesPerDivision;
    const index =
      this.mouseBarIndex * constants.number.notesPerBar + mouseNotesPerBarIndex;
    let notes = [];
    if (!constants.id.note.hasState(note)) {
      for (let i = 0; i < notesPerDivision; i++) {
        notes.push(note);
      }
    } else {
      notes.push(note);
    }
    this.props.changeNotes(index, notes);

    // add one bar if the user puts a note on the last bar
    if (index >= this.props.notes.length - constants.number.notesPerBar) {
      this.props.addBar();
    }
  }

  updateCaret(event) {
    const division = this.props.palette.division;

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
      Math.ceil(this.props.notes.length / constants.number.notesPerBar) *
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
        tabIndex={0}
        onMouseMove={this.updateCaret}
        onKeyDown={this.keyDown}
        onClick={this.changeNotes}
        ref={this.canvasRef}
        style={canvasInlineStyle}
        width={this.props.editorPane.width - 1}
        height={
          Math.ceil(this.props.notes.length / constants.number.notesPerBar) *
          constants.size.editor.bar.outside.height
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
