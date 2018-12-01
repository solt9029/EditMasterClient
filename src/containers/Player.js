import { connect } from 'react-redux';
import { setState } from '../actions/player';
import { setChangingSlider } from '../actions/player';
import { setCurrentTime } from '../actions/youtube';
import {
  reset,
  addShot,
  updateShots,
  addJudgeEffect,
  updateJudgeEffects,
} from '../actions/player';
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
  addJudgeEffect(state) {
    dispatch(addJudgeEffect(state));
  },
  updateJudgeEffects() {
    dispatch(updateJudgeEffects());
  },
  addShot(note) {
    dispatch(addShot(note));
  },
  updateShots() {
    dispatch(updateShots());
  },
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
