import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import { connect } from 'react-redux';
import NoteCircle from './NoteCircle';
import JudgeCircle from './JudgeCircle';
import NoteExtension from './NoteExtension';
import { size, id, position, number } from '../../constants';
import NoteEnd from './NoteEnd';

class Player extends Component {
  render() {
    const notesPerSecond = this.props.config
      ? (this.props.config.values.bpm * number.score.column) / 4 / 60
      : 1;
    const secondsPerNote = notesPerSecond !== 0 ? 1 / notesPerSecond : 1;
    const offset = this.props.config ? this.props.config.values.offset : 0;

    // x position of initial note
    const initialNoteX =
      ((offset - this.props.currentTime) / secondsPerNote) * size.space.width +
      position.judge.x;

    // index of initial note in canvas
    const canvasInitialNoteIndex =
      Math.floor(-initialNoteX / size.space.width) > 0
        ? Math.floor(-initialNoteX / size.space.width) - 1
        : 0;

    const canvasFinalNoteIndex =
      canvasInitialNoteIndex +
      Math.ceil((this.props.player.width - 1) / size.space.width) +
      2;

    const slicedNotes = this.props.notes.slice(
      canvasInitialNoteIndex,
      canvasFinalNoteIndex
    );

    const reversedSlicedNotes = slicedNotes.reverse();

    return (
      <div>
        <Stage
          width={this.props.player.width - 1}
          height={this.props.player.height - 1}
        >
          <Layer>
            <JudgeCircle
              x={position.judge.x}
              y={this.props.player.height / 2}
            />
            {reversedSlicedNotes.map((note, index) => {
              const x =
                initialNoteX +
                (canvasInitialNoteIndex +
                  (reversedSlicedNotes.length - index)) *
                  size.space.width;

              const y = (this.props.player.height - 1) / 2;
              const previous =
                index < reversedSlicedNotes.length - 1
                  ? reversedSlicedNotes[index + 1].id
                  : id.note.space;
              const next =
                index > 0 ? reversedSlicedNotes[index - 1].id : id.note.space;
              switch (note.id) {
                case id.note.don:
                  return <NoteCircle x={x} y={y} size="normal" color="red" />;
                case id.note.ka:
                  return <NoteCircle x={x} y={y} size="normal" color="blue" />;
                case id.note.bigdon:
                  return <NoteCircle x={x} y={y} size="big" color="red" />;
                case id.note.bigka:
                  return <NoteCircle x={x} y={y} size="big" color="blue" />;
                case id.note.renda:
                  if (previous === id.note.renda) {
                    if (next === id.note.renda) {
                      return (
                        <NoteExtension
                          size="normal"
                          x={x}
                          y={y}
                          color="yellow"
                        />
                      );
                    }
                    return <NoteEnd x={x} y={y} size="normal" color="yellow" />;
                  } else {
                    return (
                      <NoteCircle x={x} y={y} size="normal" color="yellow" />
                    );
                  }
                case id.note.bigrenda:
                  if (previous === id.note.bigrenda) {
                    if (next === id.note.bigrenda) {
                      return (
                        <NoteExtension size="big" x={x} y={y} color="yellow" />
                      );
                    }
                    return <NoteEnd x={x} y={y} size="big" color="yellow" />;
                  } else {
                    return <NoteCircle x={x} y={y} size="big" color="yellow" />;
                  }
                case id.note.balloon:
                  if (previous === id.note.balloon) {
                    if (next === id.note.balloon) {
                      return (
                        <NoteExtension size="normal" x={x} y={y} color="red" />
                      );
                    }
                    return <NoteEnd x={x} y={y} size="normal" color="red" />;
                  } else {
                    return <NoteCircle x={x} y={y} size="normal" color="red" />;
                  }
                default:
                  return null;
              }
            })}
          </Layer>
        </Stage>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.pane.player,
  notes: state.editor.notes,
  currentTime: state.player.currentTime,
  config: state.form.config,
});
export default connect(
  mapStateToProps,
  null
)(Player);
