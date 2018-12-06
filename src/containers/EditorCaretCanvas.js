import { connect } from 'react-redux';
import { updateNotes, addBar } from '../actions/score';
import EditorCaretCanvas from '../components/EditorCaretCanvas';

export default connect(
  state => ({
    palette: state.palette,
    notesLength: state.score.notes.list.length,
    notes: state.score.notes.list,
    updatedCount: state.score.notes.updatedCount,
    width: state.sizes.editor.width,
  }),
  { updateNotes, addBar }
)(EditorCaretCanvas);
