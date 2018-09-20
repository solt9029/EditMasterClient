import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage, Layer, Rect } from 'react-konva';
import { number, size, color, position } from '../../constants';
import Bar from './Bar';

class Editor extends Component {
  render() {
    const barNum = this.props.notes.length / number.score.column;
    let bars = [];
    for (let i = 0; i < barNum; i++) {
      bars.push(
        <Bar
          x={position.editorLine.x}
          y={
            i * size.editorLine.outside.height +
            (size.editorLine.outside.height - size.editorLine.inside.height) / 2
          }
          width={this.props.editorPane.width - 1 - position.editorLine.x * 2}
          height={size.editorLine.inside.height}
        />
      );
    }

    return (
      <div>
        <Stage
          width={this.props.editorPane.width - 1}
          height={barNum * size.editorLine.outside.height}
        >
          <Layer>{bars}</Layer>
        </Stage>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editorPane: state.pane.editor,
  notes: state.editor.notes,
});
export default connect(
  mapStateToProps,
  null
)(Editor);
