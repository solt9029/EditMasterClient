import React, { Component, Fragment } from 'react';
import { Rect, Line } from 'react-konva';
import { color, size, id } from '../../constants';

export default class NoteExtension extends Component {
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
        <Rect
          x={this.props.x - size.player.space.width}
          y={this.props.y - size.player[this.size].outside}
          width={size.player.space.width * 2}
          height={size[this.props.pane][this.size].outside * 2}
          fill={this.color}
        />
        <Line
          x={this.props.x}
          y={this.props.y}
          points={[
            -size.player.space.width,
            -size[this.props.pane][this.size].outside,
            size.player.space.width,
            -size[this.props.pane][this.size].outside,
          ]}
          stroke={color.black}
        />
        <Line
          x={this.props.x}
          y={this.props.y}
          points={[
            -size.player.space.width,
            size[this.props.pane][this.size].outside,
            size.player.space.width,
            size[this.props.pane][this.size].outside,
          ]}
          stroke={color.black}
        />
      </Fragment>
    );
  }
}
