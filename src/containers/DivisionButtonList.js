import DivisionButtonList from '../components/DivisionButtonList';
import { connect } from 'react-redux';
import { setCurrentDivision } from '../actions/editor';

const mapStateToProps = state => ({
  currentValue: state.editor.currentDivision,
});
const mapDispatchToProps = dispatch => ({
  setValue(value) {
    dispatch(setCurrentDivision(value));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DivisionButtonList);
