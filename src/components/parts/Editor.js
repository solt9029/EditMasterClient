import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import { number, size, position } from '../../constants';
import Bar from './Bar';

class Editor extends Component {
  render() {
    const barNum = this.props.notes.length / number.score.column;
    let bars = [];
    for (let i = 0; i < barNum; i++) {
      bars.push(
        <Bar
          x={position.editor.bar.x}
          y={
            i * size.editor.bar.outside.height +
            (size.editor.bar.outside.height - size.editor.bar.inside.height) / 2
          }
          width={this.props.editorPane.width - 1 - position.editor.bar.x * 2}
          height={size.editor.bar.inside.height}
        />
      );
    }

    return (
      <div>
        <Stage
          width={this.props.editorPane.width - 1}
          height={barNum * size.editor.bar.outside.height}
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
