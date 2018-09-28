import React, { Component } from 'react';
import { connect } from 'react-redux';
import constants from '../../constants';
import Canvas from '../../Canvas';

const canvasInlineStyle = { position: 'absolute', top: '0', left: '0' };

class EditorCurrentTimeCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvas = null;
  }

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d');
    this.canvas = new Canvas(ctx);
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.editorPane !== nextProps.editorPane ||
      this.props.noteIds.length !== nextProps.noteIds.length ||
      this.props.currentTime !== nextProps.currentTime ||
      this.props.secondsPerNote !== nextProps.secondsPerNote ||
      this.props.offset !== nextProps.offset
    );
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

    const barWidth =
      this.props.editorPane.width - 1 - constants.position.editor.bar.x * 2;
    const actualBarWidth =
      barWidth * (1 - constants.percentage.editor.barStartLine); // left side of initial beat line is not available
    const spaceWidth = actualBarWidth / constants.number.notesPerBar;

    const currentNoteIndexFloat =
      (this.props.currentTime - this.props.offset) / this.props.secondsPerNote;
    const currentNotesPerBarIndexFloat =
      currentNoteIndexFloat % constants.number.notesPerBar;
    const currentBarIndex = Math.floor(
      currentNoteIndexFloat / constants.number.notesPerBar
    );

    const y =
      currentBarIndex * constants.size.editor.bar.outside.height +
      (constants.size.editor.bar.outside.height -
        constants.size.editor.bar.inside.height) /
        2;
    const x = currentNotesPerBarIndexFloat * spaceWidth;
    this.canvas.drawCurrentTime(x, y);
  }

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        style={canvasInlineStyle}
        width={this.props.editorPane.width - 1}
        height={
          Math.ceil(this.props.noteIds.length / constants.number.notesPerBar) *
          constants.size.editor.bar.outside.height
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  editorPane: state.pane.editor,
  noteIds: state.editor.noteIds,
  currentTime: state.player.currentTime,
  secondsPerNote: state.player.secondsPerNote,
  offset: state.config.offset.value,
});
export default connect(
  mapStateToProps,
  null
)(EditorCurrentTimeCanvas);
