import React, { Component } from 'react';
import { connect } from 'react-redux';
import SplitterLayout from './SplitterLayout';
import Config from './Config';
import Player from './Player';
import Editor from './Editor';
import Palette from './Palette';
import { setPanes } from '../../actions/pane';
import { setCurrentTime } from '../../actions/player';
import YouTube from './YouTube';
import { debounce } from 'lodash';

const divInlineStyle = {
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
      youtube: React.createRef(),
    };
    this.setPanes = debounce(() => {
      this.props.setPanes(this.references);
    }, 100).bind(this);
    this.loop = this.loop.bind(this);
    this.frameId = null;
  }

  loop() {
    console.log('loop');
    this.props.setCurrentTime(
      this.props.ytPlayer ? this.props.ytPlayer.getCurrentTime() : 0
    );
    this.frameId = window.requestAnimationFrame(this.loop);
  }

  componentDidMount() {
    this.props.setPanes(this.references);
    window.addEventListener('resize', this.setPanes, false);
    this.frameId = window.requestAnimationFrame(this.loop);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setPanes, false);
    window.cancelAnimationFrame(this.frameId);
  }

  render() {
    return (
      <div>
        <SplitterLayout
          primaryIndex={1}
          vertical
          percentage
          secondaryInitialSize={20}
          onSecondaryPaneSizeChange={this.setPanes}
        >
          <div style={divInlineStyle} ref={this.references.player}>
            <Player />
          </div>
          <SplitterLayout
            percentage
            secondaryInitialSize={70}
            onSecondaryPaneSizeChange={this.setPanes}
          >
            <SplitterLayout
              percentage
              vertical
              secondaryInitialSize={20}
              onSecondaryPaneSizeChange={this.setPanes}
            >
              <div style={divInlineStyle} ref={this.references.config}>
                <Config />
              </div>
              <div style={divInlineStyle} ref={this.references.youtube}>
                <YouTube />
              </div>
            </SplitterLayout>
            <SplitterLayout
              percentage
              secondaryInitialSize={43}
              onSecondaryPaneSizeChange={this.setPanes}
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
  config: state.form.config,
  ytPlayer: state.player.ytPlayer,
});
const mapDispatchToProps = dispatch => ({
  setPanes(panes) {
    dispatch(setPanes(panes));
  },
  setCurrentTime(currentTime) {
    dispatch(setCurrentTime(currentTime));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IDE);
