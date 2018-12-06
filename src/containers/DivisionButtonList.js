import DivisionButtonList from '../components/DivisionButtonList';
import { connect } from 'react-redux';
import { setCurrentDivision } from '../actions/editor';

export default connect(
  state => ({
    currentDivision: state.editor.currentDivision,
  }),
  { setCurrentDivision }
)(DivisionButtonList);
