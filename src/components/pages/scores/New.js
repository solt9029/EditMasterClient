import React, { Component } from 'react';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import IDE from '../../parts/IDE';
import { connect } from 'react-redux';
import { setDefaultScore } from '../../../actions/config';
import ErrorModal from '../../parts/ErrorModal';
import { closeErrorModal } from '../../../actions/errorModal';

class New extends Component {
  componentDidMount() {
    this.props.setDefaultScore();
  }
  componentWillUnmount() {
    this.props.closeErrorModal();
  }
  render() {
    return (
      <div>
        <Navbar />
        <IDE />
        <Footer />
        <ErrorModal />
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  setDefaultScore() {
    dispatch(setDefaultScore());
  },
  closeErrorModal() {
    dispatch(closeErrorModal());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
