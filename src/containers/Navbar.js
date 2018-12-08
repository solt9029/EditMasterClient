import withRouter from 'react-router-dom/withRouter';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { createScore } from '../actions/score';
import { exportTjaFile } from '../actions/others';

export default withRouter(
  connect(
    state => ({
      isLoading: state.score.fetching.isLoading,
      error: state.score.fetching.error,
    }),
    { createScore, exportTjaFile }
  )(Navbar)
);
