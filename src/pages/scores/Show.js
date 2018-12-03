import React, { Component } from 'react';
import IDE from '../../containers/IDE';
import NotFound from '../NotFound';
import Modal from '../../containers/Modal';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetch, reset } from '../../actions/scores-show-view';

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
  error: state.scoresShowView.error,
  isLoading: state.scoresShowView.isLoading,
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
