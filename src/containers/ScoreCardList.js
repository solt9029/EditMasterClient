import { connect } from 'react-redux';
import ScoreCardList from '../components/ScoreCardList';

export default connect(
  state => ({
    scores: state.scores.list,
  }),
  null
)(ScoreCardList);
