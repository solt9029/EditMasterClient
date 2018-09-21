import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Rect } from 'react-konva';
import { size, position, color, percentage } from '../../constants';

class Caret extends Component {
  render() {
    const barWidth =
      this.props.editorPane.width - 1 - position.editor.bar.x * 2;
    const mouseBarIndex = Math.floor(
      this.props.mousePosition.y / size.editor.bar.outside.height
    );
    const barStartLineX =
      position.editor.bar.x + barWidth * percentage.editor.barStartLine;
    const division = this.props.palette
      ? this.props.palette.values.division
      : 1;
    let mouseNoteIndex = this.props.palette
      ? Math.round(
          (this.props.mousePosition.x - barStartLineX) /
            ((barWidth * (1 - percentage.editor.barStartLine)) / division)
        )
      : 0;
    if (mouseNoteIndex < 0) {
      mouseNoteIndex = 0;
    }
    if (mouseNoteIndex >= division) {
      mouseNoteIndex = division - 1;
    }

    return (
      <Rect
        x={
          barStartLineX +
          barWidth *
            (1 - percentage.editor.barStartLine) *
            (mouseNoteIndex / division) -
          size.editor.caret.width / 2
        }
        y={
          mouseBarIndex * size.editor.bar.outside.height +
          (size.editor.bar.outside.height - size.editor.bar.inside.height) / 2 -
          2
        }
        width={size.editor.caret.width}
        height={size.editor.bar.inside.height + 4}
        fill={color.yellow}
      />
    );
  }
}

const mapStateToProps = state => ({
  editorPane: state.pane.editor,
  mousePosition: state.editor.mousePosition,
  palette: state.form.palette,
});
export default connect(
  mapStateToProps,
  null
)(Caret);
