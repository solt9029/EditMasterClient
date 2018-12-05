import { connect } from 'react-redux';
import { updateNotes } from '../actions/editor';
import { addBar } from '../actions/editor';
import EditorCaretCanvas from '../components/EditorCaretCanvas';

export default connect(
  state => ({
    palette: state.palette,
    notesLength: state.editor.notes.length,
    notes: state.editor.notes,
  }),
  { updateNotes, addBar }
)(EditorCaretCanvas);
