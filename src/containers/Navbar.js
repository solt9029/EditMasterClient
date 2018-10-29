import withRouter from 'react-router-dom/withRouter';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

const mapStateToProps = state => ({
  isLoading: state.scoresShowView.isLoading,
  error: state.scoresShowView.error,
});
const mapDispatchToProps = null;
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
