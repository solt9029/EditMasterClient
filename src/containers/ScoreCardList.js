import { connect } from 'react-redux';
import ScoreCardList from '../components/ScoreCardList';

const mapStateToProps = state => ({
  data: state.scoreCardPaginate.data,
});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreCardList);
