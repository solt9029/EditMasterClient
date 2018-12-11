import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { parseSearchQuery, stringifySearchQuery } from '../utils/url';

const ScoreCardPaginate = ({ location, history, currentPage, lastPage }) => {
  const onPageChange = ({ selected }) => {
    const { keyword } = parseSearchQuery(location.search);
    const search = stringifySearchQuery(keyword, selected + 1);
    history.push({
      search,
    });
  };

  return (
    <ReactPaginate
      class="pagination"
      previousLabel="前"
      nextLabel="次"
      forcePage={currentPage - 1}
      pageCount={lastPage}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={onPageChange}
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
};

export default ScoreCardPaginate;

ScoreCardPaginate.propTypes = {
  lastPage: PropTypes.number,
  currentPage: PropTypes.number,
};
