import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import { connect } from 'react-redux';
import NoteCircle from './NoteCircle';
import JudgeCircle from './JudgeCircle';
import NoteExtension from './NoteExtension';
import { size, id, position, number, sound, second } from '../../constants';
import NoteEnd from './NoteEnd';
import { setState } from '../../actions/editor';

class Player extends Component {
  calcSecondsPerNote() {
    const barPerMinute = this.props.config.values.bpm / number.beat;
    const barPerSecond = barPerMinute / 60;
    const notesPerSecond = barPerSecond * number.score.column;
    const secondsPerNote = 1 / notesPerSecond;
    return secondsPerNote;
  }

  calcNoteIndexesInRange(rangeSecond, secondsPerNote) {
    const initialNoteIndex = Math.ceil(
      (this.props.currentTime - rangeSecond - this.props.config.values.offset) /
        secondsPerNote
    );
    const finalNoteIndex = Math.floor(
      (this.props.currentTime + rangeSecond - this.props.config.values.offset) /
        secondsPerNote
    );
    let indexes = [];
    for (let i = initialNoteIndex; i <= finalNoteIndex; i++) {
      indexes.push(i);
    }
    return indexes;
  }

  calcInitialNoteX(secondsPerNote) {
    const initialNoteX =
      position.judge.x +
      ((this.props.config.values.offset - this.props.currentTime) /
        secondsPerNote) *
        size.space.width;
    return initialNoteX;
  }

  renderNotes() {
    if (!this.props.config) {
      return;
    }
    if (!this.props.config.values.bpm) {
      return;
    }

    const secondsPerNote = this.calcSecondsPerNote();

    // x position of initial note
    const initialNoteX = this.calcInitialNoteX(secondsPerNote);

    // Math.floor(-initialNoteX / size.space.width) is the number of notes that already passed from canvas
    let canvasInitialNoteIndex =
      Math.floor(-initialNoteX / size.space.width) - 3;
    // the number of notes that canvas can display in it
    const canvasNotesNumber = Math.ceil(
      (this.props.player.width - 1) / size.space.width
    );
    let canvasFinalNoteIndex = canvasInitialNoteIndex + canvasNotesNumber + 6;
    if (canvasInitialNoteIndex < 0) {
      canvasInitialNoteIndex = 0;
    }
    if (canvasFinalNoteIndex < 0) {
      canvasInitialNoteIndex = 0;
    }
    const slicedNotes = this.props.notes.slice(
      canvasInitialNoteIndex,
      canvasFinalNoteIndex
    );
    const reversedSlicedNotes = slicedNotes.reverse();

    // sample code sound (not good)
    if (this.props.isAutoMode) {
      const noteIndexesInGoodJudgeRange = this.calcNoteIndexesInRange(
        second.range.good,
        secondsPerNote
      );

      // if you use forEach here, you can use return instead of continue, but it doesn't have the same function of break
      for (let i = 0; i < noteIndexesInGoodJudgeRange.length; i++) {
        if (
          noteIndexesInGoodJudgeRange[i] < 0 ||
          noteIndexesInGoodJudgeRange[i] >= this.props.notes.length
        ) {
          continue;
        }
        if (
          this.props.notes[noteIndexesInGoodJudgeRange[i]].id === id.note.don &&
          this.props.notes[noteIndexesInGoodJudgeRange[i]].state ===
            id.state.fresh
        ) {
          sound.don.trigger();
          this.props.setState(noteIndexesInGoodJudgeRange[i], id.state.good);
          break;
        }
      }
    }

    return reversedSlicedNotes.map((note, index) => {
      const x =
        initialNoteX +
        (canvasInitialNoteIndex + (reversedSlicedNotes.length - index)) *
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
              return <NoteExtension size="normal" x={x} y={y} color="yellow" />;
            }
            return <NoteEnd x={x} y={y} size="normal" color="yellow" />;
          } else {
            return <NoteCircle x={x} y={y} size="normal" color="yellow" />;
          }
        case id.note.bigrenda:
          if (previous === id.note.bigrenda) {
            if (next === id.note.bigrenda) {
              return <NoteExtension size="big" x={x} y={y} color="yellow" />;
            }
            return <NoteEnd x={x} y={y} size="big" color="yellow" />;
          } else {
            return <NoteCircle x={x} y={y} size="big" color="yellow" />;
          }
        case id.note.balloon:
          if (previous === id.note.balloon) {
            if (next === id.note.balloon) {
              return <NoteExtension size="normal" x={x} y={y} color="red" />;
            }
            return <NoteEnd x={x} y={y} size="normal" color="red" />;
          } else {
            return <NoteCircle x={x} y={y} size="normal" color="red" />;
          }
        default:
          return null;
      }
    });
  }

  render() {
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
            {this.renderNotes()}
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
  isAutoMode: state.player.isAutoMode,
});
const mapDispatchToProps = dispatch => ({
  setState(index, state) {
    dispatch(setState(index, state));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
