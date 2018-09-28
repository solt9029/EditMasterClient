import React, { Component } from 'react';
import Navbar from '../../parts/Navbar';
import IDE from '../../parts/IDE';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchScore } from '../../../actions/config';
import NotFound from '../NotFound';
import { resetNotFound } from '../../../actions/show';

class Show extends Component {
  componentDidMount() {
    this.props.fetchScore(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.resetNotFound();
  }

  render() {
    let component = (
      <div>
        <Navbar />
        <IDE />
      </div>
    );
    if (this.props.notFound) {
      component = <NotFound />;
    }

    return component;
  }
}

const mapStateToProps = state => ({
  notFound: state.show.notFound,
});
const mapDispatchToProps = dispatch => ({
  fetchScore(id) {
    dispatch(fetchScore(id));
  },
  resetNotFound() {
    dispatch(resetNotFound());
  },
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Show)
);
