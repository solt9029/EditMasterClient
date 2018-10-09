import { connect } from 'react-redux';
import { setState } from '../actions/player';
import { setChangingSlider } from '../actions/player';
import { setCurrentTime } from '../actions/youtube';
import { reset } from '../actions/player';
import Player from '../components/Player';

const mapStateToProps = state => ({
  playerPane: state.ide.panes.player,
  notes: state.editor.notes,
  states: state.player.states,
  currentTime: state.youtube.currentTime,
  config: state.config,
  isAutoMode: state.palette.isAutoMode,
  ytPlayer: state.youtube.ytPlayer,
  ytPlayerState: state.youtube.ytPlayerState,
});
const mapDispatchToProps = dispatch => ({
  setState(index, state) {
    dispatch(setState(index, state));
  },
  setCurrentTime(currentTime) {
    dispatch(setCurrentTime(currentTime));
  },
  setChangingSlider(isChangingSlider) {
    dispatch(setChangingSlider(isChangingSlider));
  },
  reset() {
    dispatch(reset());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
