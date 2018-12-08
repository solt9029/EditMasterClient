import { connect } from 'react-redux';
import PlayerNotesCanvas from '../components/PlayerNotesCanvas';

export default connect(state => ({
  width: state.sizes.player.width,
  height: state.sizes.player.height,
  bpm: state.score.bpm.value,
  speed: state.score.speed.value,
  offset: state.score.offset.value,
  notes: state.score.notes.list,
  states: state.score.states.list,
  notesUpdatedCount: state.score.notes.updatedCount,
  statesUpdatedCount: state.score.states.updatedCount,
  currentTime: state.currentTime,
}))(PlayerNotesCanvas);
