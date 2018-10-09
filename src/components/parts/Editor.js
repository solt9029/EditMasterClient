import React, { Component } from 'react';
import { connect } from 'react-redux';
import { percentages, sizes, positions, numbers, ids } from '../../constants/';
import Canvas from '../../classes/Canvas';
import EditorCaretCanvas from './EditorCaretCanvas';
import EditorCurrentTimeCanvas from './EditorCurrentTimeCanvas';
import { reset } from '../../actions/editor';

const canvasInlineStyle = { position: 'absolute', top: '0', left: '0' };

class Editor extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvas = null;
  }

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d');
    this.canvas = new Canvas(ctx);
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  updateCanvas() {
    this.canvas.clear(
      this.props.editorPane.width - 1,
      Math.ceil(this.props.notes.length / numbers.NOTES_PER_BAR) *
        sizes.EDITOR.BAR.OUTSIDE.HEIGHT
    );

    // bars
    const barNum = Math.ceil(this.props.notes.length / numbers.NOTES_PER_BAR);
    const barWidth =
      this.props.editorPane.width - 1 - positions.EDITOR.BAR.X * 2;
    for (let i = 0; i < barNum; i++) {
      this.canvas.drawBar(
        positions.EDITOR.BAR.X,
        i * sizes.EDITOR.BAR.OUTSIDE.HEIGHT,
        barWidth
      );
    }

    // notes
    const actualBarWidth = barWidth * (1 - percentages.EDITOR.BAR_START_LINE); // left side of initial beat line is not available
    const spaceWidth = actualBarWidth / numbers.NOTES_PER_BAR;
    const barStartLineX =
      positions.EDITOR.BAR.X + barWidth * percentages.EDITOR.BAR_START_LINE;

    for (let i = this.props.notes.length - 1; i >= 0; i--) {
      const note = this.props.notes[i];
      if (note === ids.NOTE.SPACE) {
        continue;
      }
      const c = i % numbers.NOTES_PER_BAR;
      const l = Math.floor(i / numbers.NOTES_PER_BAR);
      const x = barStartLineX + spaceWidth * c;
      const y = sizes.EDITOR.BAR.OUTSIDE.HEIGHT * (l + 0.5);
      const previousNote = i > 0 ? this.props.notes[i - 1] : ids.NOTE.SPACE;
      const nextNote =
        i < this.props.notes.length - 1
          ? this.props.notes[i + 1]
          : ids.NOTE.SPACE;

      this.canvas.drawNote(
        x,
        y,
        'EDITOR',
        note,
        spaceWidth,
        previousNote,
        nextNote
      );
    }
  }

  render() {
    return (
      <div>
        <canvas
          ref={this.canvasRef}
          style={canvasInlineStyle}
          width={this.props.editorPane.width - 1}
          height={
            Math.ceil(this.props.notes.length / numbers.NOTES_PER_BAR) *
            sizes.EDITOR.BAR.OUTSIDE.HEIGHT
          }
        />
        <EditorCurrentTimeCanvas />
        <EditorCaretCanvas />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editorPane: state.ide.panes.editor,
  notes: state.editor.notes,
});
const mapDispatchToProps = dispatch => ({
  reset() {
    dispatch(reset());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
