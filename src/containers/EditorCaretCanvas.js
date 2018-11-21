import { connect } from 'react-redux';
import { changeNotes } from '../actions/editor';
import { addBar } from '../actions/editor';
import EditorCaretCanvas from '../components/EditorCaretCanvas';

const mapStateToProps = state => ({
  editorWidth: state.ide.panes.editor.width,
  palette: state.palette,
  notes: state.editor.notes,
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
