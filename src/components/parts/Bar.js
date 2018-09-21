import React, { Component, Fragment } from 'react';
import { Rect } from 'react-konva';
import { color, percentage, number, size } from '../../constants';

export default class Bar extends Component {
  render() {
    const insideY =
      this.props.y +
      (size.editor.bar.outside.height - size.editor.bar.inside.height) / 2;

    let beatLines = [];
    for (let i = 0; i < number.beat; i++) {
      beatLines.push(
        <Rect
          x={
            this.props.x +
            this.props.width *
              (percentage.editor.barStartLine +
                ((1 - percentage.editor.barStartLine) * i) / number.beat) -
            size.editor.beatLine.width / 2
          }
          y={insideY - 1}
          width={size.editor.beatLine.width}
          height={size.editor.bar.inside.height + 2}
          fill={color.white}
        />
      );
    }

    return (
      <Fragment>
        <Rect
          x={this.props.x}
          y={insideY}
          width={this.props.width}
          height={size.editor.bar.inside.height}
          fill={color.gray}
        />
        {beatLines}
      </Fragment>
    );
  }
}
