import React, { Component } from 'react';
import ReactYouTube from 'react-youtube';
import { ids } from '../constants';

export default class YouTube extends Component {
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
    this.props.reset();
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
          if (event.data === ids.YOUTUBE.PLAYING) {
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
