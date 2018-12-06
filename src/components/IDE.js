import React, { Component } from 'react';
import SplitterLayout from './SplitterLayout';
import Config from '../containers/Config';
import Player from '../containers/Player';
import Editor from '../components/Editor';
import Palette from '../containers/Palette';
import YouTube from '../containers/YouTube';
import { debounce } from 'lodash';
import PaneBox from '../styled/PaneBox';
import { normalizeSizes } from '../utils/ref';

export default class IDE extends Component {
  // You can't use a name "refs" because of React specification.
  references = {
    player: React.createRef(),
    editor: React.createRef(),
    palette: React.createRef(),
  };

  setSizes = debounce(() => {
    const sizes = normalizeSizes(this.references);
    this.props.setSizes(sizes);
  }, 100);

  componentDidMount() {
    const sizes = normalizeSizes(this.references);
    this.props.setSizes(sizes);
    window.addEventListener('resize', this.setSizes, false);
  }

  componentWillUnmount() {
    this.props.resetIDE();
    window.removeEventListener('resize', this.setSizes, false);
  }

  render() {
    return (
      <div>
        <SplitterLayout
          primaryIndex={1}
          vertical
          percentage
          secondaryInitialSize={20}
          onSecondaryPaneSizeChange={this.setSizes}
        >
          <PaneBox height={100} innerRef={this.references.player}>
            <Player />
          </PaneBox>
          <SplitterLayout
            percentage
            secondaryInitialSize={70}
            onSecondaryPaneSizeChange={this.setSizes}
          >
            <SplitterLayout
              percentage
              vertical
              primaryIndex={1}
              secondaryInitialSize={20}
              onSecondaryPaneSizeChange={this.setSizes}
            >
              <PaneBox height={100}>
                <YouTube />
              </PaneBox>
              <PaneBox padding={15}>
                <Config />
              </PaneBox>
            </SplitterLayout>
            <SplitterLayout
              percentage
              secondaryInitialSize={43}
              onSecondaryPaneSizeChange={this.setSizes}
            >
              <PaneBox height={100} innerRef={this.references.editor}>
                <Editor />
              </PaneBox>
              <PaneBox padding={15} innerRef={this.references.palette}>
                <Palette />
              </PaneBox>
            </SplitterLayout>
          </SplitterLayout>
        </SplitterLayout>
      </div>
    );
  }
}
