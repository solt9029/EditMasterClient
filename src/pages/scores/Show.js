import React, { Component } from 'react';
import IDE from '../../containers/IDE';
import NotFound from '../NotFound';
import Modal from '../../containers/Modal';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchScore } from '../../actions/score';

class Show extends Component {
  componentDidMount() {
    this.props.fetchScore(this.props.match.params.id);
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

export default withRouter(
  connect(
    state => ({
      error: state.score.fetching.error,
      isLoading: state.score.fetching.isLoading,
    }),
    { fetchScore }
  )(Show)
);
