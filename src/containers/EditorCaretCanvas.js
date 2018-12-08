import { connect } from 'react-redux';
import { updateNotes, addBar } from '../actions/score';
import { setCaret } from '../actions/caret';
import EditorCaretCanvas from '../components/EditorCaretCanvas';

export default connect(
  state => ({
    currentNote: state.currentNote,
    currentDivision: state.currentDivision,
    notesLength: state.score.notes.list.length,
    notes: state.score.notes.list,
    updatedCount: state.score.notes.updatedCount,
    width: state.sizes.editor.width,
    x: state.caret.x,
    y: state.caret.y,
    barIndex: state.caret.barIndex,
    divisionIndex: state.caret.divisionIndex,
  }),
  { updateNotes, addBar, setCaret }
)(EditorCaretCanvas);
