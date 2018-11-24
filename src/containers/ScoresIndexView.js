import { connect } from 'react-redux';
import { fetch } from '../actions/score-card-paginate';
import { withRouter } from 'react-router-dom';
import { setKeyword } from '../actions/navbar';
import ScoresIndexView from '../components/ScoresIndexView';

const mapStateToProps = state => ({
  isLoading: state.scoreCardPaginate.isLoading,
  error: state.scoreCardPaginate.error,
});
const mapDispatchToProps = dispatch => ({
  fetch(page, keyword) {
    dispatch(fetch(page, keyword));
  },
  setKeyword(keyword) {
    dispatch(setKeyword(keyword));
  },
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ScoresIndexView)
);
