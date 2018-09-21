import React, { Component, Fragment } from 'react';
import { Circle, Rect } from 'react-konva';
import { color, size, id } from '../../constants';
import { connect } from 'react-redux';

class NoteCircle extends Component {
  constructor(props) {
    super(props);
    this.color = color.red;
    this.size = 'normal';

    switch (props.id) {
      case id.note.don:
        break;
      case id.note.ka:
        this.color = color.blue;
        break;
      case id.note.bigdon:
        this.size = 'big';
        break;
      case id.note.bigka:
        this.size = 'big';
        this.color = 'blue';
        break;
      case id.note.renda:
        this.color = 'yellow';
        break;
      case id.note.bigrenda:
        this.color = 'yellow';
        this.size = 'big';
        break;
      case id.note.balloon:
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.barStart && (
          <Rect
            x={this.props.x - size.player.barStartLine.width / 2}
            y={
              this.props.playerPane &&
              this.props.y - (this.props.playerPane.height - 1) / 2
            }
            width={size.player.barStartLine.width}
            height={this.props.playerPane && this.props.playerPane.height - 1}
            fill={color.gray}
          />
        )}
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={size[this.props.pane][this.size].outside}
          fill={color.white}
        />
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={size[this.props.pane][this.size].inside}
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

const mapStateToProps = state => ({
  playerPane: state.pane.player,
});
export default connect(
  mapStateToProps,
  null
)(NoteCircle);
