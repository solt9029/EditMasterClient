import React, { Component } from 'react';
import Footer from '../../components/Footer';
import ScoreCardList from '../../containers/ScoreCardList';
import ScoreCardPaginate from '../../containers/ScoreCardPaginate';
import { parseSearchQuery } from '../../utils/url';
import Container from '../../styled/Container';
import { connect } from 'react-redux';
import { fetch } from '../../actions/score-card-paginate';
import { withRouter } from 'react-router-dom';
import { setKeyword } from '../../actions/navbar';

class Index extends Component {
  componentDidMount() {
    const { location, setKeyword, fetch } = this.props;
    const { page, keyword } = parseSearchQuery(location.search);
    setKeyword(keyword);
    fetch(page, keyword);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search === nextProps.location.search) {
      return;
    }
    const { page, keyword } = parseSearchQuery(nextProps.location.search);
    this.props.fetch(page, keyword);
  }

  render() {
    const { isLoading, error } = this.props;

    return (
      <div>
        {isLoading ? (
          <Container top={30} bottom={30}>
            読み込み中です
          </Container>
        ) : error ? (
          <Container top={30} bottom={30}>
            エラーが発生しました
          </Container>
        ) : (
          <ScoreCardList />
        )}
        <ScoreCardPaginate />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.scoreCardPaginate.isLoading,
  error: state.scoreCardPaginate.error,
});
const mapDispatchToProps = dispatch => ({
  fetch(page, keyword) {
    dispatch(fetch(page, keyword));
  },
  setKeyword(keyword) {
    dispatch(setKeyword(keyword));
  },
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Index)
);
