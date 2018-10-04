import React, { Component } from 'react';
import { connect } from 'react-redux';
import SplitterLayout from './SplitterLayout';
import Config from './Config';
import Player from './Player';
import Editor from './Editor';
import Palette from './Palette';
import { calcPanes } from '../../actions/ide';
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
      editor: React.createRef(),
      palette: React.createRef(),
    };
    this.calcPanes = debounce(() => {
      this.props.calcPanes(this.references);
    }, 100).bind(this);
  }

  componentDidMount() {
    this.props.calcPanes(this.references);
    window.addEventListener('resize', this.calcPanes, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calcPanes, false);
  }

  render() {
    return (
      <div>
        <SplitterLayout
          primaryIndex={1}
          vertical
          percentage
          secondaryInitialSize={20}
          onSecondaryPaneSizeChange={this.calcPanes}
        >
          <div style={divInlineStyle} ref={this.references.player}>
            <Player />
          </div>
          <SplitterLayout
            percentage
            secondaryInitialSize={70}
            onSecondaryPaneSizeChange={this.calcPanes}
          >
            <SplitterLayout
              percentage
              vertical
              primaryIndex={1}
              secondaryInitialSize={20}
              onSecondaryPaneSizeChange={this.calcPanes}
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
              onSecondaryPaneSizeChange={this.calcPanes}
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
  ytPlayer: state.player.ytPlayer,
  isChangingSlider: state.player.isChangingSlider,
});
const mapDispatchToProps = dispatch => ({
  calcPanes(references) {
    dispatch(calcPanes(references));
  },
  setCurrentTime(currentTime) {
    dispatch(setCurrentTime(currentTime));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IDE);
