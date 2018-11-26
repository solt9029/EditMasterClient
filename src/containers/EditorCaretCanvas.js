import { connect } from 'react-redux';
import { changeNotes } from '../actions/editor';
import { addBar } from '../actions/editor';
import EditorCaretCanvas from '../components/EditorCaretCanvas';

const mapStateToProps = state => ({
  palette: state.palette,
  notesLength: state.editor.notes.length,
});
const mapDispatchToProps = dispatch => ({
  changeNotes(index, num, note) {
    dispatch(changeNotes(index, num, note));
  },
  addBar() {
    dispatch(addBar());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorCaretCanvas);
