import DivisionButtonList from '../components/DivisionButtonList';
import { connect } from 'react-redux';
import { setCurrentDivision } from '../actions/current-division';

export default connect(
  state => ({
    currentDivision: state.currentDivision,
    width: state.sizes.palette.width,
  }),
  { setCurrentDivision }
)(DivisionButtonList);
