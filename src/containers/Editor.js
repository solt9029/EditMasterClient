import { connect } from 'react-redux';
import { reset } from '../actions/editor';
import Editor from '../components/Editor';

const mapStateToProps = state => ({
  editorPane: state.ide.panes.editor,
  notes: state.editor.notes,
});
const mapDispatchToProps = dispatch => ({
  reset() {
    dispatch(reset());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
