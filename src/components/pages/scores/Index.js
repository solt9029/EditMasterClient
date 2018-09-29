import React, { Component } from 'react';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import ScoreCardList from '../../parts/ScoreCardList';
import { connect } from 'react-redux';
import { fetchData } from '../../../actions/score';
import ScoreCardPaginate from '../../parts/ScoreCardPaginate';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

class Index extends Component {
  componentDidMount() {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    const keyword = query.keyword ? query.keyword : '';
    const page = query.page ? query.page : 1;
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
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Index)
);
