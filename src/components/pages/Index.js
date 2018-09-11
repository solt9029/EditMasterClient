import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Navbar from '../parts/Navbar';
import Jumbotron from '../parts/Jumbotron';

class Index extends Component {
  render() {
    return (
      <div>
        <Navbar form />
        <Jumbotron />
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
  )(Index)
);
