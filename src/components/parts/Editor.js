import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import { number, size, position } from '../../constants';
import Bar from './Bar';
import { throttle } from 'lodash';
import { setMousePosition } from '../../actions/editor';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.setMousePosition = throttle(event => {
      this.props.setMousePosition(event.evt.offsetX, event.evt.offsetY);
    }, 200).bind(this);
  }

  render() {
    const barNum = this.props.notes.length / number.score.column;
    let bars = [];
    for (let i = 0; i < barNum; i++) {
      bars.push(
        <Bar
          key={i}
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
          onMouseMove={this.setMousePosition}
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
const mapDispatchToProps = dispatch => ({
  setMousePosition(x, y) {
    dispatch(setMousePosition(x, y));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
