import { connect } from 'react-redux';
import { addBar, removeBar } from '../actions/score';
import { toggleMode } from '../actions/player';
import Palette from '../components/Palette';

export default connect(
  state => ({
    isAutoMode: state.player.isAutoMode,
  }),
  { toggleMode, addBar, removeBar }
)(Palette);
