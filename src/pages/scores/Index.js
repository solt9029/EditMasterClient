import React, { Component } from 'react';
import Footer from '../../components/Footer';
import ScoreCardList from '../../containers/ScoreCardList';
import ScoreCardPaginate from '../../containers/ScoreCardPaginate';
import { parseSearchQuery } from '../../utils/url';
import Container from '../../styled/Container';
import { connect } from 'react-redux';
import { fetchScores, resetScores } from '../../actions/scores';
import { setKeyword } from '../../actions/keyword';
import { withRouter } from 'react-router-dom';

class Index extends Component {
  componentDidMount() {
    const { location, setKeyword, fetchScores } = this.props;
    const { page, keyword } = parseSearchQuery(location.search);
    setKeyword(keyword);
    fetchScores(page, keyword);
  }

  componentWillUnmount() {
    this.props.resetScores();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search === nextProps.location.search) {
      return;
    }
    const { page, keyword } = parseSearchQuery(nextProps.location.search);
    this.props.fetchScores(page, keyword);
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

export default withRouter(
  connect(
    state => ({
      isLoading: state.scores.isLoading,
      error: state.scores.error,
    }),
    { fetchScores, resetScores, setKeyword }
  )(Index)
);
