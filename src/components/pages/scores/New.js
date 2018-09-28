import React, { Component } from 'react';
import Navbar from '../../parts/Navbar';
import IDE from '../../parts/IDE';
import { connect } from 'react-redux';
import { setDefaultScore } from '../../../actions/config';
import ErrorModal from '../../parts/ErrorModal';
import SuccessModal from '../../parts/SuccessModal';

class New extends Component {
  componentDidMount() {
    this.props.setDefaultScore();
  }
  render() {
    return (
      <div>
        <Navbar />
        <IDE />
        <ErrorModal />
        <SuccessModal />
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  setDefaultScore() {
    dispatch(setDefaultScore());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
