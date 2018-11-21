import DivisionButtonList from '../components/DivisionButtonList';
import { connect } from 'react-redux';
import { setDivision } from '../actions/palette';

const mapStateToProps = state => ({
  currentValue: state.palette.division,
});
const mapDispatchToProps = dispatch => ({
  setValue(value) {
    dispatch(setDivision(value));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DivisionButtonList);
