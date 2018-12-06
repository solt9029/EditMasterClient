import { connect } from 'react-redux';
import { addBar, removeBar } from '../actions/score';
import { toggleMode } from '../actions/palette';
import Palette from '../components/Palette';

export default connect(
  state => ({
    isAutoMode: state.palette.isAutoMode,
    width: state.sizes.palette.width,
  }),
  { toggleMode, addBar, removeBar }
)(Palette);
