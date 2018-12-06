import { connect } from 'react-redux';
import EditorNotesCanvas from '../components/EditorNotesCanvas';

export default connect(state => ({
  notes: state.score.notes.list,
  updatedCount: state.score.notes.updatedCount,
  width: state.sizes.editor.width,
}))(EditorNotesCanvas);
