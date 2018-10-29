import withRouter from 'react-router-dom/withRouter';
import { connect } from 'react-redux';
import { create } from '../actions/modal';
import CreateButton from '../components/CreateButton';

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
  create() {
    dispatch(create());
  },
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateButton)
);
