import withRouter from 'react-router-dom/withRouter';
import { connect } from 'react-redux';
import { setKeyword } from '../actions/navbar';
import SearchForm from '../components/SearchForm';

const mapStateToProps = state => ({
  keyword: state.navbar.keyword,
});
const mapDispatchToProps = dispatch => ({
  setKeyword(keyword) {
    dispatch(setKeyword(keyword));
  },
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchForm)
);
