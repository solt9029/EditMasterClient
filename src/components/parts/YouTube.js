import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactYouTube from 'react-youtube';
import {
  setYtPlayer,
  setCurrentTime,
  setYtPlayerState,
} from '../../actions/youtube';
import { setChangingSlider, freshStates } from '../../actions/player';
import constants from '../../constants';

class YouTube extends Component {
  constructor(props) {
    super(props);
    this.frameId = null;
    this.loop = this.loop.bind(this);
  }

  loop() {
    if (this.props.ytPlayer !== null && !this.props.isChangingSlider) {
      this.props.setCurrentTime(this.props.ytPlayer.getCurrentTime());
    }
    this.frameId = window.requestAnimationFrame(this.loop);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.frameId);
  }

  render() {
    return (
      <ReactYouTube
        opts={{
          height: '95%',
          width: '100%',
          playerVars: {
            autoplay: 1,
            playsinline: 1,
          },
        }}
        videoId={this.props.config.videoId.value}
        onReady={event => {
          this.props.setYtPlayer(event.target);
          event.target.playVideo();
        }}
        onStateChange={event => {
          this.props.freshStates();
          this.props.setYtPlayerState(event.data);
          if (event.data === constants.id.youtube.playing) {
            this.props.setChangingSlider(false);
            this.frameId = window.requestAnimationFrame(this.loop);
          } else {
            window.cancelAnimationFrame(this.frameId);
          }
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  config: state.config,
  isChangingSlider: state.player.isChangingSlider,
  ytPlayer: state.youtube.ytPlayer,
});
const mapDispatchToProps = dispatch => ({
  setYtPlayer(ytPlayer) {
    dispatch(setYtPlayer(ytPlayer));
  },
  freshStates() {
    dispatch(freshStates());
  },
  setCurrentTime(currentTime) {
    dispatch(setCurrentTime(currentTime));
  },
  setChangingSlider(isChangingSlider) {
    dispatch(setChangingSlider(isChangingSlider));
  },
  setYtPlayerState(ytPlayerState) {
    dispatch(setYtPlayerState(ytPlayerState));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YouTube);
