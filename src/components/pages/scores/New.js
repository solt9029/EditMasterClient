import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';

class New extends Component {
  render() {
    return (
      <div>
        <Navbar active="scoresNew" />
        <div>Scores New Page!</div>
        <Footer />
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
  )(New)
);
