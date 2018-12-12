import { connect } from 'react-redux';
import EditorBarsCanvas from '../components/EditorBarsCanvas';

export default connect(state => ({
  height: state.sizes.editor.height,
  updatedCount: state.score.notes.updatedCount,
  width: state.sizes.editor.width,
  notesLength: state.score.notes.list.length,
  scroll: state.scroll,
}))(EditorBarsCanvas);
