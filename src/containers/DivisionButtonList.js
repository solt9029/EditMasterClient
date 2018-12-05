import DivisionButtonList from '../components/DivisionButtonList';
import { connect } from 'react-redux';
import { setCurrentDivision } from '../actions/palette';

const mapStateToProps = state => ({
  currentValue: state.palette.currentDivision,
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
