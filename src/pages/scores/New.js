import React, { Component } from 'react';
import IDE from '../../containers/IDE';
import Modal from '../../containers/Modal';
import { connect } from 'react-redux';
import { setDefaultScore } from '../../actions/scores-new-view';

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

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
  setDefaultScore() {
    dispatch(setDefaultScore());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
