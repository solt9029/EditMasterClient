import { connect } from 'react-redux';
import EditorCurrentTimeMarkCanvas from '../components/EditorCurrentTimeMarkCanvas';

const mapStateToProps = state => ({
  notesLength: state.editor.notes.length,
  currentTime: state.youtube.currentTime,
  bpm: state.config.bpm.value,
  offset: state.config.offset.value,
});
const mapDispatchToProps = null;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorCurrentTimeMarkCanvas);
