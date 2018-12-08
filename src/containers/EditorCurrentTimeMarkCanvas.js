import { connect } from 'react-redux';
import EditorCurrentTimeMarkCanvas from '../components/EditorCurrentTimeMarkCanvas';

export default connect(state => ({
  notesLength: state.score.notes.list.length,
  updatedCount: state.score.notes.updatedCount,
  currentTime: state.currentTime,
  bpm: state.score.bpm.value,
  offset: state.score.offset.value,
  width: state.sizes.editor.width,
}))(EditorCurrentTimeMarkCanvas);
