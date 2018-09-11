import React, { Component } from 'react';
import { connect } from 'react-redux';

class NotFound extends Component {
  render() {
    return <div>NotFound Page!</div>;
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotFound);
