import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactYouTube from 'react-youtube';
import { setYtPlayer } from '../../actions/player';

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
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YouTube);
