import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage, Layer, Rect } from 'react-konva';
import { number, size, position, color } from '../../constants';
import Bar from './Bar';
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

    const mouseBarIndex = Math.floor(
      this.props.mousePosition.y / size.editor.bar.outside.height
    );
    const initialNoteX = position.editor.bar.x + barWidth * 0.02;
    const division = this.props.palette
      ? this.props.palette.values.division
      : 0;
    let mouseNoteIndex = this.props.palette
      ? Math.round(
          (this.props.mousePosition.x - initialNoteX) / (barWidth / division)
        )
      : 0;
    if (mouseNoteIndex >= 16) {
      mouseNoteIndex = 15;
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
            {bars}
            <Rect
              x={initialNoteX + (barWidth * mouseNoteIndex) / division}
              y={
                mouseBarIndex * size.editor.bar.outside.height +
                (size.editor.bar.outside.height -
                  size.editor.bar.inside.height) /
                  2 -
                2
              }
              width={2}
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
