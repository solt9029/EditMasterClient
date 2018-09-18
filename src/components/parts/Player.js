import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import { connect } from 'react-redux';
import NoteCircle from './NoteCircle';

class Player extends Component {
  render() {
    return (
      <div>
        <Stage
          width={this.props.player.width - 1}
          height={this.props.player.height * 0.9}
        >
          <Layer>
            <NoteCircle
              x={50}
              y={this.props.player.height * 0.45}
              size="normal"
              color="red"
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
