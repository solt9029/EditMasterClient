import { connect } from 'react-redux';
import EditorCaretCanvas from '../components/EditorCaretCanvas';

export default connect(state => ({
  height: state.sizes.editor.height,
  updatedCount: state.score.notes.updatedCount,
  width: state.sizes.editor.width,
  x: state.caret.x,
  y: state.caret.y,
  scroll: state.scroll,
}))(EditorCaretCanvas);
