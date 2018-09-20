import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactYouTube from 'react-youtube';
import { setYtPlayer } from '../../actions/player';
import { resetState } from '../../actions/editor';

class YouTube extends Component {
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
        onStateChange={() => {
          this.props.resetState();
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  config: state.form.config,
  youtubePane: state.pane.youtube,
});
const mapDispatchToProps = dispatch => ({
  setYtPlayer(ytPlayer) {
    dispatch(setYtPlayer(ytPlayer));
  },
  resetState() {
    dispatch(resetState());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YouTube);
