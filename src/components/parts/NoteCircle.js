import React, { Component, Fragment } from 'react';
import { Circle } from 'react-konva';
import { color, size } from '../../constants';

export default class NoteCircle extends Component {
  render() {
    return (
      <Fragment>
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={size[this.props.size].outside}
          fill={color.white}
        />
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={size[this.props.size].inside}
          fill={color[this.props.color]}
        />
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={size[this.props.size].outside}
          stroke={color.black}
        />
      </Fragment>
    );
  }
}
