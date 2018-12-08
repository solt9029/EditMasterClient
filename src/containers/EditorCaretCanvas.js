import { connect } from 'react-redux';
import { updateNotes, paste } from '../actions/score';
import { setCaret } from '../actions/caret';
import { copy } from '../actions/clipboard';
import EditorCaretCanvas from '../components/EditorCaretCanvas';

export default connect(
  state => ({
    notesLength: state.score.notes.list.length,
    notes: state.score.notes.list,
    updatedCount: state.score.notes.updatedCount,
    width: state.sizes.editor.width,
    x: state.caret.x,
    y: state.caret.y,
    barIndex: state.caret.barIndex,
    divisionIndex: state.caret.divisionIndex,
  }),
  { updateNotes, setCaret, copy, paste }
)(EditorCaretCanvas);
