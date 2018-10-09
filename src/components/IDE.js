import React, { Component } from 'react';
import { connect } from 'react-redux';
import SplitterLayout from './SplitterLayout';
import Config from './Config';
import Player from './Player';
import Editor from './Editor';
import Palette from './Palette';
import { setPanes } from '../actions/ide';
import { setCurrentTime } from '../actions/youtube';
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
      editor: React.createRef(),
      palette: React.createRef(),
    };
    this.setPanes = debounce(() => {
      this.props.setPanes(this.references);
    }, 100).bind(this);
  }

  componentDidMount() {
    this.props.setPanes(this.references);
    window.addEventListener('resize', this.setPanes, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setPanes, false);
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
              primaryIndex={1}
              secondaryInitialSize={20}
              onSecondaryPaneSizeChange={this.setPanes}
            >
              <div style={divInlineStyle}>
                <YouTube />
              </div>
              <div style={divInlineStyle}>
                <Config />
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

const mapStateToProps = state => ({
  ytPlayer: state.youtube.ytPlayer,
  isChangingSlider: state.player.isChangingSlider,
});
const mapDispatchToProps = dispatch => ({
  setPanes(references) {
    dispatch(setPanes(references));
  },
  setCurrentTime(currentTime) {
    dispatch(setCurrentTime(currentTime));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IDE);
