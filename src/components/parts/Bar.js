import React, { Component, Fragment } from 'react';
import { Rect } from 'react-konva';
import { color } from '../../constants';

export default class Bar extends Component {
  render() {
    return (
      <Fragment>
        <Rect
          x={this.props.x}
          y={this.props.y}
          width={this.props.width}
          height={this.props.height}
          fill={color.gray}
        />
        <Rect
          x={this.props.x + this.props.width * 0.02 - 1}
          y={this.props.y - 1}
          width={2}
          height={this.props.height + 2}
          fill={color.white}
        />
        <Rect
          x={this.props.x + this.props.width * 0.27 - 1}
          y={this.props.y - 1}
          width={2}
          height={this.props.height + 2}
          fill={color.white}
        />
        <Rect
          x={this.props.x + this.props.width * 0.52 - 1}
          y={this.props.y - 1}
          width={2}
          height={this.props.height + 2}
          fill={color.white}
        />
        <Rect
          x={this.props.x + this.props.width * 0.77 - 1}
          y={this.props.y - 1}
          width={2}
          height={this.props.height + 2}
          fill={color.white}
        />
      </Fragment>
    );
  }
}
