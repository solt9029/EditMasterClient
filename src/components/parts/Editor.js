import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import { number, size, position, percentage, id } from '../../constants';
import Bars from './Bars';
import { throttle } from 'lodash';
import { setMousePosition } from '../../actions/editor';
import Caret from './Caret';
import NoteCircle from './NoteCircle';
import NoteExtension from './NoteExtension';
import NoteEnd from './NoteEnd';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.setMousePosition = throttle(event => {
      this.props.setMousePosition(event.evt.offsetX, event.evt.offsetY);
    }, 100).bind(this);
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

  renderNotes() {
    if (!this.props.palette) {
      return;
    }

    const barWidth =
      this.props.editorPane.width - 1 - position.editor.bar.x * 2;
    const actualBarWidth = barWidth * (1 - percentage.editor.barStartLine); // left side of initial beat line is not available
    const spaceWidth = actualBarWidth / number.score.column;
    const barStartLineX =
      position.editor.bar.x + barWidth * percentage.editor.barStartLine;

    let notes = [];
    for (let i = this.props.notes.length - 1; i >= 0; i--) {
      const note = this.props.notes[i];
      if (note.id === id.note.space) {
        continue;
      }
      const c = i % number.score.column;
      const l = Math.floor(i / number.score.column);
      const x = barStartLineX + spaceWidth * c;
      const y = size.editor.bar.outside.height * (l + 0.5);
      const previousNoteId = i > 0 ? this.props.notes[i - 1].id : id.note.space;
      const nextNoteId =
        i < this.props.notes.length - 1
          ? this.props.notes[i + 1].id
          : id.note.space;
      if (
        note.id === id.note.renda ||
        note.id === id.note.bigrenda ||
        note.id === id.note.balloon
      ) {
        if (previousNoteId === note.id) {
          if (nextNoteId === note.id) {
            notes.push(
              <NoteExtension
                key={i}
                pane="editor"
                spaceWidth={spaceWidth}
                x={x}
                y={y}
                id={note.id}
              />
            );
            continue;
          }
          notes.push(
            <NoteEnd key={i} pane="editor" x={x} y={y} id={note.id} />
          );
          continue;
        }
      }
      notes.push(<NoteCircle key={i} pane="editor" x={x} y={y} id={note.id} />);
    }
    return notes;
  }

  render() {
    if (!this.props.palette || this.props.palette) {
      return <Fragment />;
    }

    const barNum = Math.ceil(this.props.notes.length / number.score.column);
    const barWidth =
      this.props.editorPane.width - 1 - position.editor.bar.x * 2;
    const actualBarWidth = barWidth * (1 - percentage.editor.barStartLine); // left side of initial beat line is not available
    const spaceWidth = actualBarWidth / number.score.column;
    const barStartLineX =
      position.editor.bar.x + barWidth * percentage.editor.barStartLine;
    const mouseBarIndex = Math.floor(
      this.props.mousePosition.y / size.editor.bar.outside.height
    );
    let mouseNoteIndex = this.calcMouseNoteIndex(barWidth, barStartLineX);

    return (
      <div>
        <Stage
          onMouseMove={this.setMousePosition}
          width={this.props.editorPane.width - 1}
          height={barNum * size.editor.bar.outside.height}
        >
          <Layer>
            <Bars />
            <Caret />
            {this.renderNotes()}
          </Layer>
        </Stage>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editorPane: state.pane.editor,
  notes: state.editor.notes,
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
