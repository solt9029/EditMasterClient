import { connect } from 'react-redux';
import { setState } from '../actions/player';
import { setIsSliderChanging } from '../actions/slider';
import { setCurrentTime } from '../actions/youtube';
import { reset } from '../actions/player';
import {
  addShotEffect,
  addJudgeEffect,
  updateEffects,
} from '../actions/effects';
import Player from '../components/Player';

const mapStateToProps = state => ({
  playerPane: state.sizes.player,
  notes: state.editor.notes,
  states: state.player.states,
  currentTime: state.youtube.currentTime,
  config: state.config,
  isAutoMode: state.palette.isAutoMode,
  ytPlayer: state.youtube.ytPlayer,
  ytPlayerState: state.youtube.ytPlayerState,
});
const mapDispatchToProps = dispatch => ({
  updateEffects() {
    dispatch(updateEffects());
  },
  addJudgeEffect(state) {
    dispatch(addJudgeEffect(state));
  },
  addShotEffect(note) {
    dispatch(addShotEffect(note));
  },
  setState(index, state) {
    dispatch(setState(index, state));
  },
  setCurrentTime(currentTime) {
    dispatch(setCurrentTime(currentTime));
  },
  setIsSliderChanging(isSliderChanging) {
    dispatch(setIsSliderChanging(isSliderChanging));
  },
  reset() {
    dispatch(reset());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
