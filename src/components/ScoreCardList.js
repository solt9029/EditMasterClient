import React, { Component } from 'react';
import ScoreCard from './ScoreCard';
import { Row } from 'reactstrap';
import propTypes from 'prop-types';
import Container from '../styled/Container';

export default class ScoreCardList extends Component {
  render() {
    return (
      <Container top={30} bottom={30}>
        <Row>
          {this.props.scores.map((score, i) => {
            return <ScoreCard score={score} key={i} />;
          })}
        </Row>
      </Container>
    );
  }
}

ScoreCardList.propTypes = {
  scores: propTypes.array,
};
