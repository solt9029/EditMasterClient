import { connect } from 'react-redux';
import PlayerNotesCanvas from '../components/PlayerNotesCanvas';

const mapStateToProps = state => ({
  width: state.ide.panes.player.width,
  height: state.ide.panes.player.height,
  bpm: state.config.bpm.value,
  speed: state.config.speed.value,
  offset: state.config.offset.value,
  notes: state.editor.notes,
  states: state.player.states,
  currentTime: state.youtube.currentTime,
});
const mapDispatchToProps = null;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerNotesCanvas);
