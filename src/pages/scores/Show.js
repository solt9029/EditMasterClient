import React, { Component, Fragment } from 'react';
import IDE from '../../containers/IDE';
import NotFound from '../NotFound';
import Modal from '../../containers/Modal';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchScore } from '../../actions/score';

class Show extends Component {
  componentDidMount() {
    const { fetchScore, match } = this.props;
    fetchScore(match.params.id);
  }

  render() {
    return (
      <Fragment>
        {this.props.error ? (
          <NotFound />
        ) : (
          <div>
            <IDE />
            <Modal />
          </div>
        )}
      </Fragment>
    );
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
