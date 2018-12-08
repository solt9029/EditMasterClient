import { connect } from 'react-redux';
import EditorNotesCanvas from '../components/EditorNotesCanvas';

export default connect(state => ({
  notes: state.score.notes.list,
  updatedCount: state.score.notes.updatedCount,
  width: state.sizes.editor.width,
  notesLength: state.score.notes.list.length, // this is necessary for shouldComponentUpdate. (you can't use notes.length instead of notesLength because notes is mutable.)
}))(EditorNotesCanvas);
