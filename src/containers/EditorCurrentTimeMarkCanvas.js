import { connect } from 'react-redux';
import EditorCurrentTimeMarkCanvas from '../components/EditorCurrentTimeMarkCanvas';

const mapStateToProps = state => ({
  notesLength: state.score.notes.list.length,
  updatedCount: state.score.notes.updatedCount,
  currentTime: state.youtube.currentTime,
  bpm: state.score.bpm.value,
  offset: state.score.offset.value,
  width: state.sizes.editor.width,
});
const mapDispatchToProps = null;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorCurrentTimeMarkCanvas);
