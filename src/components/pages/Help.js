import React, { Component } from 'react';
import { connect } from 'react-redux';

class Help extends Component {
  render() {
    return <div>Help Page!</div>;
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Help);
