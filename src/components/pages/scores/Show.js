import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Navbar from '../../parts/Navbar';
import SplitterLayout from '../../parts/SplitterLayout';
import Config from '../../parts/Config';
import Player from '../../parts/Player';
import Editor from '../../parts/Editor';
import Palette from '../../parts/Palette';
import { setPanes } from '../../../actions/pane';

const divInlineStyle = {
  backgroundColor: '#222',
  height: '100%',
};

class Show extends Component {
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
        <Navbar active="scoresNew" />
        <div>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  panes: state.pane.panes,
});
const mapDispatchToProps = dispatch => ({
  setPanes(panes) {
    dispatch(setPanes(panes));
  },
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Show)
);
