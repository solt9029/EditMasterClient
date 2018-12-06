import { connect } from 'react-redux';
import EditorBarsCanvas from '../components/EditorBarsCanvas';

export default connect(state => ({
  notesLength: state.score.notes.list.length,
  updatedCount: state.score.notes.updatedCount,
  width: state.sizes.editor.width,
}))(EditorBarsCanvas);
