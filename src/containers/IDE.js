import { connect } from 'react-redux';
import { setSizes } from '../actions/sizes';
import { resetIDE } from '../actions/others';
import IDE from '../components/IDE';

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
  setSizes(sizes) {
    dispatch(setSizes(sizes));
  },
  resetIDE() {
    dispatch(resetIDE());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IDE);
