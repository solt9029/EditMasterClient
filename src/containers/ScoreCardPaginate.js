import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reset } from '../actions/score-card-paginate';
import ScoreCardPaginate from '../components/ScoreCardPaginate';

const mapStateToProps = state => ({
  currentPage: state.scoreCardPaginate.currentPage,
  lastPage: state.scoreCardPaginate.lastPage,
});
const mapDispatchToProps = dispatch => ({
  reset() {
    dispatch(reset());
  },
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ScoreCardPaginate)
);
