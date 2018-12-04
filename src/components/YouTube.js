import React, { Component } from 'react';
import ReactYouTube from 'react-youtube';
import { Ids } from '../constants';
import propTypes from 'prop-types';

const opts = {
  height: '95%',
  width: '100%',
  playerVars: {
    autoplay: 1,
    playsinline: 1,
  },
};

export default class YouTube extends Component {
  frameId = null;

  componentWillUnmount() {
    window.cancelAnimationFrame(this.frameId);
  }

  loop = () => {
    const { ytPlayer, isSliderChanging, setCurrentTime } = this.props;

    if (ytPlayer !== null && !isSliderChanging) {
      const currentTime = ytPlayer.getCurrentTime();
      setCurrentTime(currentTime);
    }
    this.frameId = window.requestAnimationFrame(this.loop);
  };

  onYouTubeReady = event => {
    this.props.setYtPlayer(event.target);
    event.target.playVideo();
  };

  onYouTubeStateChange = event => {
    const { freshStates, setIsSliderChanging } = this.props;

    freshStates();

    if (event.data !== Ids.YOUTUBE.PLAYING) {
      window.cancelAnimationFrame(this.frameId);
      return;
    }
    setIsSliderChanging(false);
    this.frameId = window.requestAnimationFrame(this.loop);
  };

  render() {
    const { videoId } = this.props;

    return (
      <ReactYouTube
        opts={opts}
        videoId={videoId}
        onReady={this.onYouTubeReady}
        onStateChange={this.onYouTubeStateChange}
      />
    );
  }
}

YouTube.propTypes = {
  videoId: propTypes.string,
  setYtPlayer: propTypes.func,
  freshStates: propTypes.func,
  setIsSliderChanging: propTypes.func,
  isSliderChanging: propTypes.bool,
};
