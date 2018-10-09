import React, { Component } from 'react';
import SplitterLayout from './SplitterLayout';
import Config from '../containers/Config';
import Player from '../containers/Player';
import Editor from '../containers/Editor';
import Palette from '../containers/Palette';
import YouTube from '../containers/YouTube';
import { debounce } from 'lodash';

const divInlineStyle = {
  height: '100%',
};

export default class IDE extends Component {
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
