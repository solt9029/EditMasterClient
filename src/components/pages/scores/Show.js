import React, { Component } from 'react';
import Navbar from '../../parts/Navbar';
import IDE from '../../parts/IDE';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetch } from '../../../actions/show';
import NotFound from '../NotFound';
import { reset } from '../../../actions/show';
import Modal from '../../parts/Modal';

class Show extends Component {
  componentDidMount() {
    this.props.fetch(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    let component = (
      <div>
        <Navbar />
        <IDE />
        <Modal />
      </div>
    );
    if (this.props.error) {
      component = <NotFound />;
    }

    return component;
  }
}

const mapStateToProps = state => ({
  error: state.show.error,
  isLoading: state.show.isLoading,
});
const mapDispatchToProps = dispatch => ({
  fetch(id) {
    dispatch(fetch(id));
  },
  reset() {
    dispatch(reset());
  },
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Show)
);
