import withRouter from 'react-router-dom/withRouter';
import { connect } from 'react-redux';
import { setKeyword } from '../actions/keyword';
import SearchForm from '../components/SearchForm';

export default withRouter(
  connect(
    state => ({
      keyword: state.keyword,
    }),
    { setKeyword }
  )(SearchForm)
);
