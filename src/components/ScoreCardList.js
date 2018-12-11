import React, { Fragment } from 'react';
import ScoreCard from './ScoreCard';
import PropTypes from 'prop-types';

const ScoreCardList = ({ scores }) => (
  <Fragment>
    {scores.map((score, i) => {
      return <ScoreCard score={score} key={i} />;
    })}
  </Fragment>
);

export default ScoreCardList;

ScoreCardList.propTypes = {
  scores: PropTypes.array,
};
