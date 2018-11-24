import React, { Component } from 'react';
import Navbar from '../containers/Navbar';
import Footer from './Footer';
import ScoreCardList from '../containers/ScoreCardList';
import { Container } from 'reactstrap';
import ScoreCardPaginate from '../containers/ScoreCardPaginate';
import * as utils from '../utils';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 30px;
  margin-bottom: 30px;
`;

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
        <Navbar />
        {isLoading ? (
          <StyledContainer>読み込み中です</StyledContainer>
        ) : error ? (
          <StyledContainer>エラーが発生しました</StyledContainer>
        ) : (
          <ScoreCardList />
        )}
        <ScoreCardPaginate />
        <Footer />
      </div>
    );
  }
}
