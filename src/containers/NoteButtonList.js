import { connect } from 'react-redux';
import { setCurrentNote } from '../actions/palette';
import NoteButtonList from '../components/NoteButtonList';

const mapStateToProps = state => ({
  currentValue: state.palette.currentNote,
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
