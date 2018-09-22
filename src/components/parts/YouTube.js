import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactYouTube from 'react-youtube';
import { setYtPlayer, setCurrentTime } from '../../actions/player';
import { resetState } from '../../actions/editor';

class YouTube extends Component {
  constructor(props) {
    super(props);
    this.frameId = null;
    this.loop = this.loop.bind(this);
  }

  loop() {
    if (this.props.ytPlayer && !this.props.isChangingSlider) {
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
          },
        }}
        videoId={this.props.config && this.props.config.values.videoId}
        onReady={event => {
          this.props.setYtPlayer(event.target);
          event.target.playVideo();
        }}
        onStateChange={event => {
          this.props.resetState();
          if (event.data === 1) {
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
  config: state.form.config,
  isChangingSlider: state.player.isChangingSlider,
  ytPlayer: state.player.ytPlayer,
});
const mapDispatchToProps = dispatch => ({
  setYtPlayer(ytPlayer) {
    dispatch(setYtPlayer(ytPlayer));
  },
  resetState() {
    dispatch(resetState());
  },
  setCurrentTime(currentTime) {
    dispatch(setCurrentTime(currentTime));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YouTube);
