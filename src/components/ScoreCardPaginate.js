import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import propTypes from 'prop-types';
import { parseSearchQuery, stringifySearchQuery } from '../utils/url';

export default class ScoreCardPaginate extends Component {
  componentWillUnmount() {
    this.props.reset();
  }

  onPageChange = data => {
    const { location, history } = this.props;

    const { keyword } = parseSearchQuery(location.search);
    const search = stringifySearchQuery(keyword, data.selected + 1);
    history.push({
      search,
    });
  };

  render() {
    const { currentPage, lastPage } = this.props;

    return (
      <ReactPaginate
        class="pagination"
        previousLabel="前"
        nextLabel="次"
        forcePage={currentPage - 1}
        pageCount={lastPage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={this.onPageChange}
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
