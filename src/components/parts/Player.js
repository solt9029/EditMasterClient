import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import { connect } from 'react-redux';
import NoteCircle from './NoteCircle';
import JudgeCircle from './JudgeCircle';
import NoteExtension from './NoteExtension';
import { size, id, position } from '../../constants';
import NoteEnd from './NoteEnd';

class Player extends Component {
  render() {
    // one-dimensional and reversed
    const notes = Array.prototype.concat.apply([], this.props.notes).reverse();
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
            {notes.map((note, index) => {
              const x =
                -this.props.currentTime * 100 +
                position.judge.x +
                notes.length * size.space.width -
                index * size.space.width;
              const y = this.props.player.height / 2;
              const previous =
                index < notes.length - 1 ? notes[index + 1] : id.note.space;
              const next = index > 0 ? notes[index - 1] : id.note.space;
              switch (note) {
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
});
export default connect(
  mapStateToProps,
  null
)(Player);
