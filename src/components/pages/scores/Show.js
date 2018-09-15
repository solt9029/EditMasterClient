import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Navbar from '../../parts/Navbar';
import SplitterLayout from 'react-splitter-layout';

class Show extends Component {
  render() {
    return (
      <div>
        <Navbar active="scoresNew" />
        <div>
          <SplitterLayout vertical percentage secondaryInitialSize={80}>
            <div>1</div>
            <SplitterLayout percentage secondaryInitialSize={70}>
              <div>2</div>
              <SplitterLayout percentage secondaryInitialSize={43}>
                <div>3</div>
                <div>4</div>
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
