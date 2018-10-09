import { connect } from 'react-redux';
import { changeNotes } from '../actions/editor';
import { addBar } from '../actions/editor';
import EditorCaretCanvas from '../components/EditorCaretCanvas';

const mapStateToProps = state => ({
  editorPane: state.ide.panes.editor,
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
