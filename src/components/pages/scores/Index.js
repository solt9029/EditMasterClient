import React, { Component } from 'react';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import ScoreCardList from '../../parts/ScoreCardList';
import { connect } from 'react-redux';
import { fetchData } from '../../../actions/score';
import ScoreCardPaginate from '../../parts/ScoreCardPaginate';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { setKeyword } from '../../../actions/navbar';
import { setPage } from '../../../actions/scoreCardPaginate';

class Index extends Component {
  componentDidMount() {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    const page = query.page ? +query.page : 1;
    const keyword = query.keyword ? query.keyword : '';
    this.props.setKeyword(keyword);
    this.props.setPage(page);
    this.props.fetchData(page, keyword);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search === nextProps.location.search) {
      return;
    }
    const query = qs.parse(nextProps.location.search, {
      ignoreQueryPrefix: true,
    });
    const page = query.page ? query.page : 1;
    const keyword = query.keyword ? query.keyword : '';
    this.props.fetchData(page, keyword);
  }

  render() {
    return (
      <div>
        <Navbar />
        <ScoreCardList />
        <ScoreCardPaginate />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  fetchData(page, keyword) {
    dispatch(fetchData(page, keyword));
  },
  setKeyword(keyword) {
    dispatch(setKeyword(keyword));
  },
  setPage(page) {
    dispatch(setPage(page));
  },
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Index)
);
