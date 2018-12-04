import { connect } from 'react-redux';
import Editor from '../components/Editor';

export default connect(
  state => ({
    width: state.sizes.editor.width,
    notes: state.editor.notes,
  }),
  null
)(Editor);
