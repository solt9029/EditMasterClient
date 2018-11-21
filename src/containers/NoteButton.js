import { connect } from 'react-redux';
import { setNote } from '../actions/palette';
import NoteButton from '../components/NoteButton';

const mapStateToProps = state => ({
  currentValue: state.palette.note,
  paletteWidth: state.ide.panes.palette.width,
});
const mapDispatchToProps = dispatch => ({
  setValue(value) {
    dispatch(setNote(value));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteButton);
