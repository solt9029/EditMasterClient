import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Navbar from '../../parts/Navbar';
import SplitterLayout from '../../parts/SplitterLayout';
import Config from '../../parts/Config';
import Player from '../../parts/Player';
import Editor from '../../parts/Editor';
import Palette from '../../parts/Palette';
import styled from 'styled-components';

const StyledDiv = styled.div`
  background-color: #222;
  height: 100%;
  min-height: 100%;
`;

class Show extends Component {
  render() {
    return (
      <div>
        <Navbar active="scoresNew" />
        <div>
          <SplitterLayout vertical percentage secondaryInitialSize={80}>
            <StyledDiv>
              <Player />
            </StyledDiv>
            <SplitterLayout percentage secondaryInitialSize={70}>
              <StyledDiv>
                <Config />
              </StyledDiv>
              <SplitterLayout percentage secondaryInitialSize={43}>
                <StyledDiv>
                  <Editor />
                </StyledDiv>
                <StyledDiv>
                  <Palette />
                </StyledDiv>
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
