import { connect } from 'react-redux';
import { setSizes } from '../actions/sizes';
import IDE from '../components/IDE';

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
  setSizes(sizes) {
    dispatch(setSizes(sizes));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IDE);
