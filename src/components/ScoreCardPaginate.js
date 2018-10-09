import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import qs from 'qs';
import history from '../history';
import { withRouter } from 'react-router-dom';
import { reset } from '../actions/scoreCardPaginate';

class ScoreCardPaginate extends Component {
  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    return (
      <ReactPaginate
        class="pagination"
        previousLabel={'前'}
        nextLabel={'次'}
        forcePage={this.props.currentPage - 1}
        pageCount={this.props.lastPage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={data => {
          const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true,
          });
          const keyword = query.keyword ? query.keyword : '';
          const search = qs.stringify(
            {
              page: data.selected + 1,
              keyword,
            },
            { addQueryPrefix: true }
          );
          history.push({
            search,
          });
        }}
        activeClassName="active"
        breakClassName="page-item"
        breakLabel={<a className="page-link">...</a>}
        pageClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        containerClassName="pagination justify-content-center"
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.scoreCardPaginate.data,
  currentPage: state.scoreCardPaginate.currentPage,
  from: state.scoreCardPaginate.from,
  lastPage: state.scoreCardPaginate.lastPage,
  perPage: state.scoreCardPaginate.perPage,
  total: state.scoreCardPaginate.total,
  to: state.scoreCardPaginate.to,
});
const mapDispatchToProps = dispatch => ({
  reset() {
    dispatch(reset());
  },
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ScoreCardPaginate)
);
