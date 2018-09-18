import React, { Component } from 'react';
import { Circle } from 'react-konva';
import { white, normalSize } from '../../note';

export default class JudgeCircle extends Component {
  render() {
    return (
      <Circle
        x={this.props.x}
        y={this.props.y}
        radius={normalSize.outside}
        stroke={white}
      />
    );
  }
}
