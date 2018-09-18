import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import { connect } from 'react-redux';
import NoteCircle from './NoteCircle';
import JudgeCircle from './JudgeCircle';
import NoteExtension from './NoteExtension';
import { size, id, judge } from '../../note';
import NoteEnd from './NoteEnd';

class Player extends Component {
  render() {
    // one-dimensional and reversed
    const score = Array.prototype.concat.apply([], this.props.score).reverse();
    return (
      <div>
        <Stage
          width={this.props.player.width - 1}
          height={this.props.player.height - 1}
        >
          <Layer>
            <JudgeCircle x={judge.x} y={this.props.player.height / 2} />
            {score.map((note, index) => {
              const x =
                judge.x +
                score.length * size.normal.outside -
                index * size.normal.outside;
              const y = this.props.player.height / 2;
              const previous =
                index < score.length - 1 ? score[index + 1] : id.space;
              const next = index > 0 ? score[index - 1] : id.space;
              switch (note) {
                case id.don:
                  return <NoteCircle x={x} y={y} size="normal" color="red" />;
                case id.ka:
                  return <NoteCircle x={x} y={y} size="normal" color="blue" />;
                case id.bigdon:
                  return <NoteCircle x={x} y={y} size="big" color="red" />;
                case id.bigka:
                  return <NoteCircle x={x} y={y} size="big" color="blue" />;
                case id.renda:
                  if (previous === id.renda) {
                    if (next === id.renda) {
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
                case id.bigrenda:
                  if (previous === id.bigrenda) {
                    if (next === id.bigrenda) {
                      return (
                        <NoteExtension size="big" x={x} y={y} color="yellow" />
                      );
                    }
                    return <NoteEnd x={x} y={y} size="big" color="yellow" />;
                  } else {
                    return <NoteCircle x={x} y={y} size="big" color="yellow" />;
                  }
                case id.balloon:
                  if (previous === id.balloon) {
                    if (next === id.balloon) {
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
  score: state.editor.score,
});
export default connect(
  mapStateToProps,
  null
)(Player);
