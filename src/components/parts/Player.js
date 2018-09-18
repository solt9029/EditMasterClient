import React, { Component } from 'react';
import { Stage, Layer, Circle, Text } from 'react-konva';
import { connect } from 'react-redux';

class Player extends Component {
  render() {
    return (
      <div>
        <Stage
          width={this.props.player.width - 1}
          height={this.props.player.height * 0.9}
        >
          <Layer>
            <Circle
              x={50}
              y={this.props.player.height * 0.45}
              radius={15}
              fill="#999"
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.pane.player,
});
export default connect(
  mapStateToProps,
  null
)(Player);
