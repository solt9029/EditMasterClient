import { connect } from 'react-redux';
import { addBar, removeBar } from '../actions/editor';
import { toggleMode } from '../actions/palette';
import Palette from '../components/Palette';

const mapStateToProps = state => ({
  isAutoMode: state.palette.isAutoMode,
  width: state.sizes.palette.width,
});
const mapDispatchToProps = dispatch => ({
  toggleMode() {
    dispatch(toggleMode());
  },
  addBar() {
    dispatch(addBar());
  },
  removeBar() {
    dispatch(removeBar());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Palette);
