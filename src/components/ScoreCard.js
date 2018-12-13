import React from 'react';
import { Col, CardImg, CardText, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
  margin-bottom: ${({ bottom }) => (bottom ? bottom : 0)}em;
  text-align: ${({ right }) => (right ? 'right' : 'left')};
`;

const Username = styled.span`
  padding-left: 0.4rem;
  font-weight: 700;
  font-size: 1.2rem;
`;

const Comment = styled.span`
  color: #444;
`;

const Date = styled.span`
  font-size: 0.6em;
  color: #666;
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
          <StyledCardText bottom={0.2}>
            <Icon src="/images/icon.png" alt="icon" />
            <Username>{score.username}</Username>
          </StyledCardText>
          <StyledCardText>
            <Comment>{score.comment}</Comment>
          </StyledCardText>
          <StyledCardText right={1}>
            <Date>Created at {score.created_at}</Date>
          </StyledCardText>
        </StyledCardBody>
      </StyledCard>
    </Col>
  );
};

export default ScoreCard;

ScoreCard.propTypes = {
  score: PropTypes.shape({
    id: PropTypes.number,
    video_id: PropTypes.string,
    username: PropTypes.string,
    comment: PropTypes.string,
    created_at: PropTypes.string,
  }),
};
