import React, { Component, Fragment } from 'react';
import { Circle, Rect } from 'react-konva';
import { color, size } from '../../constants';
import { connect } from 'react-redux';

class NoteCircle extends Component {
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
          radius={size[this.props.pane][this.props.size].outside}
          fill={color.white}
        />
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={size[this.props.pane][this.props.size].inside}
          fill={color[this.props.color]}
        />
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={size[this.props.pane][this.props.size].outside}
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
