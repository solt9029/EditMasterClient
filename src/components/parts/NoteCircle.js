import React, { Component, Fragment } from 'react';
import { Circle } from 'react-konva';
import { red, yellow, blue, white, normalSize, bigSize } from '../../note';

// props: size(big, normal), color(red, yellow, blue)
export default class NoteCircle extends Component {
  render() {
    return (
      <Fragment>
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={
            (this.props.size === 'big' && bigSize.outside) ||
            (this.props.size === 'normal' && normalSize.outside)
          }
          fill={white}
        />
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={
            (this.props.size === 'big' && bigSize.inside) ||
            (this.props.size === 'normal' && normalSize.inside)
          }
          fill={
            (this.props.color === 'red' && red) ||
            (this.props.color === 'blue' && blue) ||
            (this.props.color === 'yellow' && yellow)
          }
        />
      </Fragment>
    );
  }
}
