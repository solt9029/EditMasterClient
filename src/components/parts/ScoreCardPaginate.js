import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { fetchData } from '../../actions/score';

class ScoreCardPaginate extends Component {
  render() {
    return (
      <ReactPaginate
        class="pagination"
        previousLabel={'前へ'}
        nextLabel={'次へ'}
        pageCount={this.props.lastPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={data => {
          this.props.fetchData(data.selected + 1);
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
});
const mapDispatchToProps = dispatch => ({
  fetchData(page) {
    dispatch(fetchData(page));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreCardPaginate);
