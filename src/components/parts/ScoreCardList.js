import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScoreCard from './ScoreCard';
import { Container, Row } from 'reactstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 30px;
  margin-bottom: 30px;
`;

class ScoreCardList extends Component {
  render() {
    return (
      <StyledContainer>
        <Row>
          {this.props.data.map((score, i) => {
            return <ScoreCard score={score} key={i} />;
          })}
        </Row>
      </StyledContainer>
    );
  }
}

const mapStateToProps = state => ({
  data: state.score.data,
});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreCardList);
