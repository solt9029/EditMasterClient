import React, { Component, Fragment } from 'react';
import { Rect } from 'react-konva';
import { color, percentage, number, size } from '../../constants';

export default class Bar extends Component {
  render() {
    let beatLines = [];
    for (let i = 0; i < number.beat; i++) {
      beatLines.push(
        <Rect
          x={
            this.props.x +
            this.props.width *
              (percentage.editor.barStartLine + i / number.beat) -
            size.editor.beatLine.width / 2
          }
          y={this.props.y - 1}
          width={size.editor.beatLine.width}
          height={this.props.height + 2}
          fill={color.white}
        />
      );
    }

    return (
      <Fragment>
        <Rect
          x={this.props.x}
          y={this.props.y}
          width={this.props.width}
          height={this.props.height}
          fill={color.gray}
        />
        {beatLines}
      </Fragment>
    );
  }
}
