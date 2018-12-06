import withRouter from 'react-router-dom/withRouter';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

export default withRouter(
  connect(state => ({
    isLoading: state.score.fetching.isLoading,
    error: state.score.fetching.error,
  }))(Navbar)
);
