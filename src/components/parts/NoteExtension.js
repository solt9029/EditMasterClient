import React, { Component, Fragment } from 'react';
import { Rect, Line } from 'react-konva';
import { color, size } from '../../constants';

export default class NoteExtension extends Component {
  render() {
    return (
      <Fragment>
        <Rect
          x={this.props.x - size.play.space.width}
          y={this.props.y - size.play[this.props.size].outside}
          width={size.play.space.width * 2}
          height={size.play[this.props.size].outside * 2}
          fill={color[this.props.color]}
        />
        <Line
          x={this.props.x}
          y={this.props.y}
          points={[
            -size.play.space.width,
            -size.play[this.props.size].outside,
            size.play.space.width,
            -size.play[this.props.size].outside,
          ]}
          stroke={color.black}
        />
        <Line
          x={this.props.x}
          y={this.props.y}
          points={[
            -size.play.space.width,
            size.play[this.props.size].outside,
            size.play.space.width,
            size.play[this.props.size].outside,
          ]}
          stroke={color.black}
        />
      </Fragment>
    );
  }
}
