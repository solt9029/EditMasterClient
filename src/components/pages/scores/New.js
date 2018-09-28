import React, { Component } from 'react';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import IDE from '../../parts/IDE';
import { connect } from 'react-redux';
import { setDefaultScore } from '../../../actions/config';

class New extends Component {
  componentDidMount() {
    this.props.setDefaultScore();
  }
  render() {
    return (
      <div>
        <Navbar />
        <IDE />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  configForm: state.form.config,
});
const mapDispatchToProps = dispatch => ({
  setDefaultScore() {
    dispatch(setDefaultScore());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
