import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number, size, position, percentage, id } from '../../constants';
import { throttle } from 'lodash';
import { setMousePosition } from '../../actions/editor';
import Canvas from '../../Canvas';
import EditorCaretCanvas from './EditorCaretCanvas';

const canvasInlineStyle = { position: 'absolute', top: '0', left: '0' };

class Editor extends Component {
  constructor(props) {
    super(props);
    this.setMousePosition = throttle(event => {
      this.props.setMousePosition(event.evt.offsetX, event.evt.offsetY);
    }, 100).bind(this);
    this.canvasRef = React.createRef();
    this.canvas = null;
  }

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d');
    this.canvas = new Canvas(ctx);
    this.updateCanvas();
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.palette !== nextProps.palette ||
      this.props.editorPane !== nextProps.editorPane ||
      this.props.noteIds !== nextProps.noteIds
    );
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    if (!this.props.palette) {
      return;
    }

    // bars
    const barNum = this.props.noteIds.length / number.score.column;
    const barWidth =
      this.props.editorPane.width - 1 - position.editor.bar.x * 2;
    for (let i = 0; i < barNum; i++) {
      this.canvas.drawBar(
        position.editor.bar.x,
        i * size.editor.bar.outside.height,
        barWidth
      );
    }

    // notes
    const actualBarWidth = barWidth * (1 - percentage.editor.barStartLine); // left side of initial beat line is not available
    const spaceWidth = actualBarWidth / number.score.column;
    const barStartLineX =
      position.editor.bar.x + barWidth * percentage.editor.barStartLine;

    for (let i = this.props.noteIds.length - 1; i >= 0; i--) {
      const noteId = this.props.noteIds[i];
      if (noteId === id.note.space) {
        continue;
      }
      const c = i % number.score.column;
      const l = Math.floor(i / number.score.column);
      const x = barStartLineX + spaceWidth * c;
      const y = size.editor.bar.outside.height * (l + 0.5);
      const previousNoteId = i > 0 ? this.props.noteIds[i - 1] : id.note.space;
      const nextNoteId =
        i < this.props.noteIds.length - 1
          ? this.props.noteIds[i + 1]
          : id.note.space;

      this.canvas.drawNote(
        x,
        y,
        'editor',
        noteId,
        previousNoteId,
        nextNoteId,
        spaceWidth
      );
    }
  }

  calcMouseNoteIndex(barWidth, barStartLineX) {
    let mouseNoteIndex = Math.round(
      (this.props.mousePosition.x - barStartLineX) /
        ((barWidth * (1 - percentage.editor.barStartLine)) /
          this.props.palette.values.division)
    );
    if (mouseNoteIndex < 0) {
      mouseNoteIndex = 0;
    }
    if (mouseNoteIndex >= this.props.palette.values.division) {
      mouseNoteIndex = this.props.palette.values.division - 1;
    }
    return mouseNoteIndex;
  }

  render() {
    return (
      <div>
        <canvas
          ref={this.canvasRef}
          style={canvasInlineStyle}
          width={this.props.editorPane.width - 1}
          height={this.props.editorPane.height - 1}
        />
        <EditorCaretCanvas />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editorPane: state.pane.editor,
  noteIds: state.editor.noteIds,
  mousePosition: state.editor.mousePosition,
  palette: state.form.palette,
});
const mapDispatchToProps = dispatch => ({
  setMousePosition(x, y) {
    dispatch(setMousePosition(x, y));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
