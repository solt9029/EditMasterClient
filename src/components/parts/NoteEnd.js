import React, { Component, Fragment } from 'react';
import { Circle } from 'react-konva';
import { color, size, id } from '../../constants';

export default class NoteEnd extends Component {
  constructor(props) {
    super(props);
    this.color = color.yellow;
    this.size = 'normal';

    switch (props.id) {
      case id.note.renda:
        break;
      case id.note.bigrenda:
        this.size = 'big';
        break;
      case id.note.balloon:
        this.color = color.red;
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Fragment>
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={size[this.props.pane][this.size].outside}
          fill={this.color}
        />
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={size[this.props.pane][this.size].outside}
          stroke={color.black}
        />
      </Fragment>
    );
  }
}
