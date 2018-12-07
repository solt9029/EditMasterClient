import { connect } from 'react-redux';
import { updateState } from '../actions/score';
import { setIsSliderChanging } from '../actions/slider';
import { setCurrentTime } from '../actions/youtube';
import {
  addShotEffect,
  addJudgeEffect,
  addFireworkEffect,
  addBackgroundEffect,
  updateEffects,
} from '../actions/effects';
import Player from '../components/Player';

export default connect(
  state => ({
    playerPane: state.sizes.player,
    notes: state.score.notes.list,
    states: state.score.states.list,
    notesUpdatedCount: state.score.notes.updatedCount,
    statesUpdatedCount: state.score.states.updatedCount,
    currentTime: state.youtube.currentTime,
    config: state.score,
    isAutoMode: state.player.isAutoMode,
    ytPlayer: state.youtube.ytPlayer,
  }),
  {
    updateEffects,
    addJudgeEffect,
    addShotEffect,
    addFireworkEffect,
    addBackgroundEffect,
    updateState,
    setCurrentTime,
    setIsSliderChanging,
  }
)(Player);
