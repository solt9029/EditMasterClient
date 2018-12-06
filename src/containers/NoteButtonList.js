import { connect } from 'react-redux';
import { setCurrentNote } from '../actions/editor';
import NoteButtonList from '../components/NoteButtonList';

export default connect(
  state => ({
    currentNote: state.editor.currentNote,
  }),
  { setCurrentNote }
)(NoteButtonList);
