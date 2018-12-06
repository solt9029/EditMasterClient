import { connect } from 'react-redux';
import { setCurrentNote } from '../actions/editor';
import NoteButtonList from '../components/NoteButtonList';

const mapStateToProps = state => ({
  currentValue: state.editor.currentNote,
});
const mapDispatchToProps = dispatch => ({
  setValue(value) {
    dispatch(setCurrentNote(value));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteButtonList);
