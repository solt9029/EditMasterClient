import { connect } from 'react-redux';
import { setCurrentNote } from '../actions/current-note';
import NoteButtonList from '../components/NoteButtonList';

export default connect(
  state => ({
    currentNote: state.currentNote,
  }),
  { setCurrentNote }
)(NoteButtonList);
