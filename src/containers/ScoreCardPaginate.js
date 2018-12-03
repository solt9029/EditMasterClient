import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ScoreCardPaginate from '../components/ScoreCardPaginate';

export default withRouter(
  connect(
    state => ({
      currentPage: state.scores.currentPage,
      lastPage: state.scores.lastPage,
    }),
    null
  )(ScoreCardPaginate)
);
