import React, { Component, Fragment } from 'react';
import { number, size, position } from '../../constants';
import Bar from './Bar';
import { connect } from 'react-redux';

class Bars extends Component {
  render() {
    const barNum = this.props.notes.length / number.score.column;
    const barWidth =
      this.props.editorPane.width - 1 - position.editor.bar.x * 2;
    let bars = [];
    for (let i = 0; i < barNum; i++) {
      bars.push(
        <Bar
          key={i}
          x={position.editor.bar.x}
          y={i * size.editor.bar.outside.height}
          width={barWidth}
        />
      );
    }

    return <Fragment>{bars}</Fragment>;
  }
}

const mapStateToProps = state => ({
  editorPane: state.pane.editor,
  notes: state.editor.notes,
});
export default connect(
  mapStateToProps,
  null
)(Bars);
