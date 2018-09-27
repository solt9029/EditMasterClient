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
              <div style={divInlineStyle} ref={this.references.youtube}>
                <YouTube />
              </div>
              <div style={divInlineStyle} ref={this.references.config}>
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
  config: state.form.config,
  ytPlayer: state.player.ytPlayer,
  isChangingSlider: state.player.isChangingSlider,
});
const mapDispatchToProps = dispatch => ({
  setPanes(references) {
    if (
      !references.player.current ||
      !references.config.current ||
      !references.editor.current ||
      !references.palette.current ||
      !references.youtube.current
    ) {
      return;
    }

    dispatch(
      setPanes({
        player: {
          width: references.player.current.offsetWidth,
          height: references.player.current.offsetHeight,
        },
        config: {
          width: references.config.current.offsetWidth,
          height:
            references.palette.current.offsetHeight -
            references.youtube.current.offsetHeight -
            4,
        },
        editor: {
          width: references.editor.current.offsetWidth,
          height: references.editor.current.offsetHeight,
        },
        palette: {
          width: references.palette.current.offsetWidth,
          height: references.palette.current.offsetHeight,
        },
        youtube: {
          width: references.youtube.current.offsetWidth,
          height: references.youtube.current.offsetHeight,
        },
      })
    );
  },
  setCurrentTime(currentTime) {
    dispatch(setCurrentTime(currentTime));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IDE);
