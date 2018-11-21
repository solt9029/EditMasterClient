import { connect } from 'react-redux';
import { setNote } from '../actions/palette';
import NoteButtonList from '../components/NoteButtonList';

const mapStateToProps = state => ({
  currentValue: state.palette.note,
});
const mapDispatchToProps = dispatch => ({
  setValue(value) {
    dispatch(setNote(value));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteButtonList);
