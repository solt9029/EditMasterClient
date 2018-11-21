import { connect } from 'react-redux';
import { setPanes } from '../actions/ide';
import IDE from '../components/IDE';

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
  setPanes(references) {
    dispatch(setPanes(references));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IDE);
