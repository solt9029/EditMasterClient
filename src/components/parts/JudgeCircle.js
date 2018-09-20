import React, { Component } from 'react';
import { Circle } from 'react-konva';
import { color, size } from '../../constants';

export default class JudgeCircle extends Component {
  render() {
    return (
      <Circle
        x={this.props.x}
        y={this.props.y}
        radius={size.player.normal.outside}
        stroke={color.white}
      />
    );
  }
}
