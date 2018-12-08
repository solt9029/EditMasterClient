import { connect } from 'react-redux';
import EditorCaretCanvas from '../components/EditorCaretCanvas';

export default connect(state => ({
  notesLength: state.score.notes.list.length,
  updatedCount: state.score.notes.updatedCount,
  width: state.sizes.editor.width,
  x: state.caret.x,
  y: state.caret.y,
}))(EditorCaretCanvas);
