import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Show extends Component {
  render() {
    return <div>Scores Show {this.props.match.params.id} Page!</div>;
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
