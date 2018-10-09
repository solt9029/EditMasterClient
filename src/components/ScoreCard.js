import React from 'react';
import { Card, Col, CardImg, CardText, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  margin-top: 15px;
  margin-bottom: 15px;
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

const cardBodyInlineStyle = {
  paddingTop: '0.7rem',
  paddingBottom: '0.7rem',
  paddingRight: '1rem',
  paddingLeft: '1rem',
};

const ScoreCard = ({ score }) => {
  return (
    <Col lg={4} md={6} sm={6} xs={12}>
      <StyledCard tag={Link} to={`/scores/${score.id}`}>
        <CardImg
          top
          src={`http://i.ytimg.com/vi/${score.video_id}/mqdefault.jpg`}
          alt="score"
        />
        <CardBody style={cardBodyInlineStyle}>
          <StyledCardText>
            <Icon src="/images/icon.png" alt="icon" />
            <Username>{score.username}</Username>
          </StyledCardText>
          <StyledCardText>
            <Comment>{score.comment}</Comment>
          </StyledCardText>
        </CardBody>
      </StyledCard>
    </Col>
  );
};

export default ScoreCard;
