import { connect } from 'react-redux';
import { updateNotes } from '../actions/editor';
import { addBar } from '../actions/editor';
import EditorCaretCanvas from '../components/EditorCaretCanvas';

const mapStateToProps = state => ({
  palette: state.palette,
  notesLength: state.editor.notes.length,
  notes: state.editor.notes,
});
const mapDispatchToProps = dispatch => ({
  updateNotes(index, num, note) {
    dispatch(updateNotes(index, num, note));
  },
  addBar() {
    dispatch(addBar());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorCaretCanvas);
