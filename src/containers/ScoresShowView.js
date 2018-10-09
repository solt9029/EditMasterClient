import ScoresShowView from '../components/ScoresShowView';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetch } from '../actions/show';
import { reset } from '../actions/show';

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
  )(ScoresShowView)
);
