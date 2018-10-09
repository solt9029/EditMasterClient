import React, { Component } from 'react';
import ScoreCard from './ScoreCard';
import { Container, Row } from 'reactstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 30px;
  margin-bottom: 30px;
`;

export default class ScoreCardList extends Component {
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
