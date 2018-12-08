import { connect } from 'react-redux';
import { updateNotes, paste } from '../actions/score';
import { setCaret } from '../actions/caret';
import { copy } from '../actions/clipboard';
import Editor from '../components/Editor';

export default connect(
  null,
  { updateNotes, setCaret, copy, paste }
)(Editor);
