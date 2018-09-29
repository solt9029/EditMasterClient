import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import qs from 'qs';
import history from '../../history';
import { withRouter } from 'react-router-dom';
import { setPage } from '../../actions/scoreCardPaginate';

class ScoreCardPaginate extends Component {
  render() {
    return (
      <ReactPaginate
        class="pagination"
        previousLabel={'前'}
        nextLabel={'次'}
        forcePage={this.props.page - 1}
        pageCount={this.props.lastPage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={data => {
          this.props.setPage(data.selected + 1);
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
  data: state.score.data,
  currentPage: state.score.currentPage,
  from: state.score.from,
  lastPage: state.score.lastPage,
  perPage: state.score.perPage,
  total: state.score.total,
  to: state.score.to,
  page: state.scoreCardPaginate.page,
});
const mapDispatchToProps = dispatch => ({
  setPage(page) {
    dispatch(setPage(page));
  },
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ScoreCardPaginate)
);
