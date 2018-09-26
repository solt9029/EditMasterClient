import React, { Component } from 'react';
import { connect } from 'react-redux';
import constants from '../../constants';
import Canvas from '../../Canvas';
import EditorCaretCanvas from './EditorCaretCanvas';
import EditorCurrentTimeCanvas from './EditorCurrentTimeCanvas';

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

  updateCanvas() {
    this.canvas.clear(
      this.props.editorPane.width - 1,
      Math.ceil(this.props.noteIds.length / constants.number.notesPerBar) *
        constants.size.editor.bar.outside.height
    );

    // bars
    const barNum = Math.ceil(
      this.props.noteIds.length / constants.number.notesPerBar
    );
    const barWidth =
      this.props.editorPane.width - 1 - constants.position.editor.bar.x * 2;
    for (let i = 0; i < barNum; i++) {
      this.canvas.drawBar(
        constants.position.editor.bar.x,
        i * constants.size.editor.bar.outside.height,
        barWidth
      );
    }

    // notes
    const actualBarWidth =
      barWidth * (1 - constants.percentage.editor.barStartLine); // left side of initial beat line is not available
    const spaceWidth = actualBarWidth / constants.number.notesPerBar;
    const barStartLineX =
      constants.position.editor.bar.x +
      barWidth * constants.percentage.editor.barStartLine;

    for (let i = this.props.noteIds.length - 1; i >= 0; i--) {
      const noteId = this.props.noteIds[i];
      if (noteId === constants.id.note.space) {
        continue;
      }
      const c = i % constants.number.notesPerBar;
      const l = Math.floor(i / constants.number.notesPerBar);
      const x = barStartLineX + spaceWidth * c;
      const y = constants.size.editor.bar.outside.height * (l + 0.5);
      const previousNoteId =
        i > 0 ? this.props.noteIds[i - 1] : constants.id.note.space;
      const nextNoteId =
        i < this.props.noteIds.length - 1
          ? this.props.noteIds[i + 1]
          : constants.id.note.space;

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

  render() {
    return (
      <div>
        <canvas
          ref={this.canvasRef}
          style={canvasInlineStyle}
          width={this.props.editorPane.width - 1}
          height={
            Math.ceil(
              this.props.noteIds.length / constants.number.notesPerBar
            ) * constants.size.editor.bar.outside.height
          }
        />
        <EditorCurrentTimeCanvas />
        <EditorCaretCanvas />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editorPane: state.pane.editor,
  noteIds: state.editor.noteIds,
});
export default connect(
  mapStateToProps,
  null
)(Editor);
