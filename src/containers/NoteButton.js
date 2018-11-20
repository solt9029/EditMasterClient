import { connect } from 'react-redux';
import { setNote } from '../actions/palette';
import NoteRadio from '../components/NoteButton';

const mapStateToProps = state => ({
  currentNote: state.palette.note,
  paletteWidth: state.ide.panes.palette.width,
});
const mapDispatchToProps = dispatch => ({
  setNote(note) {
    dispatch(setNote(note));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteRadio);
