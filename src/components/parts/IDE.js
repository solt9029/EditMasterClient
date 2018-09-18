import React, { Component } from 'react';
import { connect } from 'react-redux';
import SplitterLayout from './SplitterLayout';
import Config from './Config';
import Player from './Player';
import Editor from './Editor';
import Palette from './Palette';
import { setPanes } from '../../actions/pane';
import YouTube from 'react-youtube';
import { setYtPlayer } from '../../actions/player';

const divInlineStyle = {
  backgroundColor: '#222',
  height: '100%',
};

class IDE extends Component {
  constructor(props) {
    super(props);
    this.references = {
      player: React.createRef(),
      config: React.createRef(),
      editor: React.createRef(),
      palette: React.createRef(),
    };
    this.setPanes = this.setPanes.bind(this);
  }

  setPanes() {
    this.props.setPanes(this.references);
  }

  componentDidMount() {
    this.props.setPanes(this.references);
    window.addEventListener('resize', this.setPanes);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setPanes);
  }

  render() {
    return (
      <div>
        <YouTube
          opts={{
            height: '300',
            width: '400',
            playerVars: {
              autoplay: 1,
            },
          }}
          videoId={this.props.config && this.props.config.values.videoId}
          onReady={event => {
            this.props.setYtPlayer(event.target);
          }}
        />
        <SplitterLayout
          primaryIndex={1}
          vertical
          percentage
          secondaryInitialSize={20}
          onSecondaryPaneSizeChange={() => {
            this.props.setPanes(this.references);
          }}
        >
          <div style={divInlineStyle} ref={this.references.player}>
            <Player />
          </div>
          <SplitterLayout
            percentage
            secondaryInitialSize={70}
            onSecondaryPaneSizeChange={() => {
              this.props.setPanes(this.references);
            }}
          >
            <div style={divInlineStyle} ref={this.references.config}>
              <Config />
            </div>
            <SplitterLayout
              percentage
              secondaryInitialSize={43}
              onSecondaryPaneSizeChange={() => {
                this.props.setPanes(this.references);
              }}
            >
              <div style={divInlineStyle} ref={this.references.editor}>
                <Editor />
              </div>
              <div style={divInlineStyle} ref={this.references.palette}>
                <Palette />
              </div>
            </SplitterLayout>
          </SplitterLayout>
        </SplitterLayout>
      </div>
    );
  }
}

// redux-form doesn't create state (state.form.config is undefined until Config component is mounted)
// this shouldn't specify like 'videoId: state.form.config.values.videoId' since state.form.config is already undefined
const mapStateToProps = state => ({
  panes: state.pane.panes,
  config: state.form.config,
});
const mapDispatchToProps = dispatch => ({
  setPanes(panes) {
    dispatch(setPanes(panes));
  },
  setYtPlayer(ytPlayer) {
    dispatch(setYtPlayer(ytPlayer));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IDE);
