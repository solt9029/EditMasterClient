import React, { Component } from 'react';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import ScoreCardList from '../../parts/ScoreCardList';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { fetch } from '../../../actions/scoreCardPaginate';
import ScoreCardPaginate from '../../parts/ScoreCardPaginate';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { setKeyword } from '../../../actions/navbar';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 30px;
  margin-bottom: 30px;
`;

class Index extends Component {
  componentDidMount() {
    const { page, keyword } = this.getQueries(this.props.location.search);
    this.props.setKeyword(keyword);
    this.props.fetch(page, keyword);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search === nextProps.location.search) {
      return;
    }
    const { page, keyword } = this.getQueries(nextProps.location.search);
    this.props.fetch(page, keyword);
  }

  getQueries(search) {
    const query = qs.parse(search, {
      ignoreQueryPrefix: true,
    });
    const page = query.page ? query.page : 1;
    const keyword = query.keyword ? query.keyword : '';
    return { page, keyword };
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
