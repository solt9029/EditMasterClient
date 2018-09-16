import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Navbar from '../../parts/Navbar';
import SplitterLayout from '../../parts/SplitterLayout';
import Config from '../../parts/Config';
import Player from '../../parts/Player';
import Editor from '../../parts/Editor';
import Palette from '../../parts/Palette';

class Show extends Component {
  render() {
    return (
      <div>
        <Navbar active="scoresNew" />
        <div>
          <SplitterLayout vertical percentage secondaryInitialSize={80}>
            <Player />
            <SplitterLayout percentage secondaryInitialSize={70}>
              <Config />
              <SplitterLayout percentage secondaryInitialSize={43}>
                <Editor />
                <Palette />
              </SplitterLayout>
            </SplitterLayout>
          </SplitterLayout>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Show)
);
