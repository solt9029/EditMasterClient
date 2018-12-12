import { connect } from 'react-redux';
import { updateNotes, paste } from '../actions/score';
import { setCaret } from '../actions/caret';
import { copy } from '../actions/clipboard';
import Editor from '../components/Editor';
import { setScroll } from '../actions/scroll';

export default connect(
  state => ({
    height: state.sizes.editor.height,
    width: state.sizes.editor.width,
    notesLength: state.score.notes.list.length,
    scroll: state.scroll,
  }),
  { updateNotes, setCaret, copy, paste, setScroll }
)(Editor);
