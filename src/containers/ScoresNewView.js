import ScoresNewView from '../components/ScoresNewView';
import { connect } from 'react-redux';
import { setDefaultScore } from '../actions/new';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  setDefaultScore() {
    dispatch(setDefaultScore());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoresNewView);
