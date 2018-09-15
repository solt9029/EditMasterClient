import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../parts/Navbar';
import Footer from '../parts/Footer';

class Help extends Component {
  render() {
    return (
      <div>
        <Navbar active="help" />
        <div>Help Page!</div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Help);
