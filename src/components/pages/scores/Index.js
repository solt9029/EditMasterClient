import React, { Component } from 'react';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import ScoreCardList from '../../parts/ScoreCardList';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchData } from '../../../actions/score';
import ScoreCardPaginate from '../../parts/ScoreCardPaginate';

class Index extends Component {
  componentDidMount() {
    this.props.fetchData(1);
  }

  render() {
    return (
      <div>
        <Navbar />
        <ScoreCardList />
        <ScoreCardPaginate />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  fetchData(page) {
    dispatch(fetchData(page));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
