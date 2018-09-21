import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage, Layer, Rect } from 'react-konva';
import { number, size, position, color, percentage } from '../../constants';
import Bars from './Bars';
import { throttle } from 'lodash';
import { setMousePosition } from '../../actions/editor';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.setMousePosition = throttle(event => {
      this.props.setMousePosition(event.evt.offsetX, event.evt.offsetY);
    }, 50).bind(this);
  }

  render() {
    const barNum = this.props.notes.length / number.score.column;
    const barWidth =
      this.props.editorPane.width - 1 - position.editor.bar.x * 2;

    const mouseBarIndex = Math.floor(
      this.props.mousePosition.y / size.editor.bar.outside.height
    );
    const initialNoteX = position.editor.bar.x + barWidth * 0.02;
    const division = this.props.palette
      ? this.props.palette.values.division
      : 1;
    let mouseNoteIndex = this.props.palette
      ? Math.round(
          (this.props.mousePosition.x - initialNoteX) /
            ((barWidth * (1 - percentage.editor.barStartLine)) / division)
        )
      : 0;
    if (mouseNoteIndex < 0) {
      mouseNoteIndex = 0;
    }
    if (mouseNoteIndex >= division) {
      mouseNoteIndex = division - 1;
    }

    console.log(mouseBarIndex);
    console.log(mouseNoteIndex);

    return (
      <div>
        <Stage
          onMouseMove={this.setMousePosition}
          width={this.props.editorPane.width - 1}
          height={barNum * size.editor.bar.outside.height}
        >
          <Layer>
            <Bars x={0} y={0} num={barNum} barWidth={barWidth} />
            <Rect
              x={
                initialNoteX +
                barWidth *
                  (1 - percentage.editor.barStartLine) *
                  (mouseNoteIndex / division) -
                size.editor.caret.width / 2
              }
              y={
                mouseBarIndex * size.editor.bar.outside.height +
                (size.editor.bar.outside.height -
                  size.editor.bar.inside.height) /
                  2 -
                2
              }
              width={size.editor.caret.width}
              height={size.editor.bar.inside.height + 4}
              fill={color.yellow}
            />
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
