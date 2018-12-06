import React, { Component } from 'react';
import IDE from '../../containers/IDE';
import Modal from '../../containers/Modal';
import { connect } from 'react-redux';
import { setDefaultScore } from '../../actions/score';

class New extends Component {
  componentDidMount() {
    this.props.setDefaultScore();
  }
  render() {
    return (
      <div>
        <IDE />
        <Modal />
      </div>
    );
  }
}

export default connect(
  null,
  { setDefaultScore }
)(New);
