import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Rect } from 'react-konva';
import { size, position, color, percentage } from '../../constants';

class Caret extends Component {
  render() {
    if (!this.props.palette) {
      return <Fragment />;
    }

    const barWidth =
      this.props.editorPane.width - 1 - position.editor.bar.x * 2;

    // left side of initial beat line is not available
    const actualBarWidth = barWidth * (1 - percentage.editor.barStartLine);

    const mouseBarIndex = Math.floor(
      this.props.mousePosition.y / size.editor.bar.outside.height
    );

    const barStartLineX =
      position.editor.bar.x + barWidth * percentage.editor.barStartLine;

    let mouseNoteIndex = Math.round(
      (this.props.mousePosition.x - barStartLineX) /
        ((barWidth * (1 - percentage.editor.barStartLine)) /
          this.props.palette.values.division)
    );
    if (mouseNoteIndex < 0) {
      mouseNoteIndex = 0;
    }
    if (mouseNoteIndex >= this.props.palette.values.division) {
      mouseNoteIndex = this.props.palette.values.division - 1;
    }

    return (
      <Rect
        x={
          barStartLineX +
          actualBarWidth *
            (mouseNoteIndex / this.props.palette.values.division) -
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
