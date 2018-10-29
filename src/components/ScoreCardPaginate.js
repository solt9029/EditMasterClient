import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import qs from 'qs';
import propTypes from 'prop-types';

export default class ScoreCardPaginate extends Component {
  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const { currentPage, lastPage, location, history } = this.props;

    return (
      <ReactPaginate
        class="pagination"
        previousLabel="前"
        nextLabel="次"
        forcePage={currentPage - 1}
        pageCount={lastPage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={data => {
          const query = qs.parse(location.search, {
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

ScoreCardPaginate.propTypes = {
  lastPage: propTypes.number,
  currentPage: propTypes.number,
  reset: propTypes.func,
};
