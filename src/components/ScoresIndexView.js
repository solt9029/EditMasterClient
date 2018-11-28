import React, { Component } from 'react';
import Footer from './Footer';
import ScoreCardList from '../containers/ScoreCardList';
import ScoreCardPaginate from '../containers/ScoreCardPaginate';
import * as utils from '../utils';
import Container from '../styled/Container';

export default class ScoresIndexView extends Component {
  componentDidMount() {
    const { page, keyword } = utils.url.getQueries(this.props.location.search);
    this.props.setKeyword(keyword);
    this.props.fetch(page, keyword);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search === nextProps.location.search) {
      return;
    }
    const { page, keyword } = utils.url.getQueries(nextProps.location.search);
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
