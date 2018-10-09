import DivisionRadio from '../components/DivisionRadio';
import { connect } from 'react-redux';
import { setDivision } from '../actions/palette';

const mapStateToProps = state => ({
  division: state.palette.division,
  paletteWidth: state.ide.panes.palette.width,
});
const mapDispatchToProps = dispatch => ({
  setDivision(division) {
    dispatch(setDivision(division));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DivisionRadio);
