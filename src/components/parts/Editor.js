import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import { number, size } from '../../constants';
import Bars from './Bars';
import { throttle } from 'lodash';
import { setMousePosition } from '../../actions/editor';
import Caret from './Caret';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.setMousePosition = throttle(event => {
      this.props.setMousePosition(event.evt.offsetX, event.evt.offsetY);
    }, 50).bind(this);
  }

  render() {
    const barNum = this.props.notes.length / number.score.column;

    return (
      <div>
        <Stage
          onMouseMove={this.setMousePosition}
          width={this.props.editorPane.width - 1}
          height={barNum * size.editor.bar.outside.height}
        >
          <Layer>
            <Bars />
            <Caret />
          </Layer>
        </Stage>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editorPane: state.pane.editor,
  notes: state.editor.notes,
  mousePosition: state.editor.mousePosition,
  palette: state.form.palette,
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
