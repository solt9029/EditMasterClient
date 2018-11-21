import DivisionButton from '../components/DivisionButton';
import { connect } from 'react-redux';
import { setDivision } from '../actions/palette';

const mapStateToProps = state => ({
  currentValue: state.palette.division,
  paletteWidth: state.ide.panes.palette.width,
});
const mapDispatchToProps = dispatch => ({
  setValue(value) {
    dispatch(setDivision(value));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DivisionButton);
