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
    const { page, keyword } = this.getQueries(this.props.location.search);
    this.props.setKeyword(keyword);
    this.props.fetch(page, keyword);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search === nextProps.location.search) {
      return;
    }
    const { getQueries } = utils.url;
    const { page, keyword } = getQueries(nextProps.location.search);
    this.props.fetch(page, keyword);
  }

  render() {
    const { isLoading, error } = this.props;
    let component = <ScoreCardList />;
    if (isLoading) {
      component = <StyledContainer>読み込み中です</StyledContainer>;
    }
    if (error) {
      component = <StyledContainer>エラーが発生しました</StyledContainer>;
    }

    return (
      <div>
        <Navbar />
        {component}
        <ScoreCardPaginate />
        <Footer />
      </div>
    );
  }
}
