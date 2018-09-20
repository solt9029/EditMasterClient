import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import { number, size } from '../../constants';

class Editor extends Component {
  render() {
    return (
      <div>
        <Stage
          width={this.props.editorPane.width - 1}
          height={
            (this.props.notes.length / number.score.column) *
            size.editorLine.height
          }
        >
          <Layer />
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
