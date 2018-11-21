import { connect } from 'react-redux';
import { addBar, removeBar } from '../actions/editor';
import { reset, toggleMode } from '../actions/palette';
import Palette from '../components/Palette';

const mapStateToProps = state => ({
  isAutoMode: state.palette.isAutoMode,
  width: state.ide.panes.palette.width,
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
  reset() {
    dispatch(reset());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Palette);
