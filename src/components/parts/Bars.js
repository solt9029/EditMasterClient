import React, { Component, Fragment } from 'react';
import { size, position } from '../../constants';
import Bar from './Bar';
import { connect } from 'react-redux';

class Bars extends Component {
  render() {
    let bars = [];
    for (let i = 0; i < this.props.num; i++) {
      bars.push(
        <Bar
          key={i}
          x={this.props.x + position.editor.bar.x}
          y={this.props.y + i * size.editor.bar.outside.height}
          width={this.props.barWidth}
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
