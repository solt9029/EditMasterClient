import withRouter from 'react-router-dom/withRouter';
import { connect } from 'react-redux';
import { create } from '../actions/modal';
import { setKeyword } from '../actions/navbar';
import Navbar from '../components/Navbar';

const mapStateToProps = state => ({
  notes: state.editor.notes,
  config: state.config,
  keyword: state.navbar.keyword,
  isLoading: state.scoresShowView.isLoading,
  error: state.scoresShowView.error,
});
const mapDispatchToProps = dispatch => ({
  create() {
    dispatch(create());
  },
  setKeyword(keyword) {
    dispatch(setKeyword(keyword));
  },
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
