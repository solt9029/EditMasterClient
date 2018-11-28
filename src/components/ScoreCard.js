import React from 'react';
import { Col, CardImg, CardText, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import propTypes from 'prop-types';
import Card from '../styled/Card';

const StyledCard = styled(Card)`
  box-shadow: 1px 1px 2px;
  color: black;
  :hover {
    box-shadow: 3px 3px 6px;
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const StyledCardText = styled(CardText)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.2rem;
`;

const Username = styled.span`
  padding-left: 0.4rem;
  font-weight: 700;
  font-size: 1.2rem;
`;

const Comment = styled.span`
  color: #555;
`;

const Icon = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;

const StyledCardBody = styled(CardBody)`
  && {
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    padding-right: 1rem;
    padding-left: 1rem;
  }
`;

const ScoreCard = ({ score }) => {
  return (
    <Col lg={4} md={6} sm={6} xs={12}>
      <StyledCard tag={Link} to={`/scores/${score.id}`}>
        <CardImg
          top
          src={`http://i.ytimg.com/vi/${score.video_id}/mqdefault.jpg`}
          alt="score"
        />
        <StyledCardBody>
          <StyledCardText>
            <Icon src="/images/icon.png" alt="icon" />
            <Username>{score.username}</Username>
          </StyledCardText>
          <StyledCardText>
            <Comment>{score.comment}</Comment>
          </StyledCardText>
        </StyledCardBody>
      </StyledCard>
    </Col>
  );
};

export default ScoreCard;

ScoreCard.propTypes = {
  score: propTypes.shape({
    id: propTypes.number,
    video_id: propTypes.string,
    username: propTypes.string,
    comment: propTypes.string,
  }),
};
