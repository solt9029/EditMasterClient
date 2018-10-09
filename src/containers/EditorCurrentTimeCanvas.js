import { connect } from 'react-redux';
import EditorCurrentTimeCanvas from '../components/EditorCurrentTimeCanvas';

const mapStateToProps = state => ({
  editorPane: state.ide.panes.editor,
  notes: state.editor.notes,
  currentTime: state.youtube.currentTime,
  bpm: state.config.bpm.value,
  offset: state.config.offset.value,
});
export default connect(
  mapStateToProps,
  null
)(EditorCurrentTimeCanvas);
