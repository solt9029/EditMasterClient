import ScoresShowView from '../components/ScoresShowView';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetch } from '../actions/scoresShowView';
import { reset } from '../actions/scoresShowView';

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
  )(ScoresShowView)
);
