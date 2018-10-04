import React, { Component } from 'react';
import Navbar from '../../parts/Navbar';
import IDE from '../../parts/IDE';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetch } from '../../../actions/show';
import NotFound from '../NotFound';
import { reset } from '../../../actions/show';
import Modal from '../../parts/Modal';
import styled from 'styled-components';
import { Container } from 'reactstrap';

const StyledContainer = styled(Container)`
  margin-top: 30px;
  margin-bottom: 30px;
`;

class Show extends Component {
  componentDidMount() {
    this.props.fetch(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    let show = (
      <div>
        <Navbar />
        <IDE />
        <Modal />
      </div>
    );
    if (this.props.isLoading) {
      show = (
        <div>
          <Navbar />
          <StyledContainer>読み込み中です</StyledContainer>
        </div>
      );
    }
    if (this.props.error) {
      show = <NotFound />;
    }

    return show;
  }
}

const mapStateToProps = state => ({
  error: state.show.error,
  isLoading: state.show.isLoading,
});
const mapDispatchToProps = dispatch => ({
  fetch(id) {
    dispatch(fetch(id));
  },
  reset() {
    dispatch(reset());
  },
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Show)
);
