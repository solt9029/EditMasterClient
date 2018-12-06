import { connect } from 'react-redux';
import { updateState } from '../actions/score';
import { setIsSliderChanging } from '../actions/slider';
import { setCurrentTime } from '../actions/youtube';
import {
  addShotEffect,
  addJudgeEffect,
  updateEffects,
} from '../actions/effects';
import Player from '../components/Player';

const mapStateToProps = state => ({
  playerPane: state.sizes.player,
  notes: state.score.notes.list,
  states: state.score.states.list,
  notesUpdatedCount: state.score.notes.updatedCount,
  statesUpdatedCount: state.score.states.updatedCount,
  currentTime: state.youtube.currentTime,
  config: state.score,
  isAutoMode: state.palette.isAutoMode,
  ytPlayer: state.youtube.ytPlayer,
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
  updateState(value) {
    dispatch(updateState(value));
  },
  setCurrentTime(currentTime) {
    dispatch(setCurrentTime(currentTime));
  },
  setIsSliderChanging(isSliderChanging) {
    dispatch(setIsSliderChanging(isSliderChanging));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
