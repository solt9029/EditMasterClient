import React, { Component } from 'react';
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

const cardBodyInlineStyle = {
  paddingTop: '0.7rem',
  paddingBottom: '0.7rem',
  paddingRight: '1rem',
  paddingLeft: '1rem',
};

export default class ScoreCard extends Component {
  render() {
    return (
      <Col lg={4} md={6} sm={6} xs={12}>
        <StyledCard tag={Link} to={`/scores/${this.props.score.id}`}>
          <CardImg
            top
            width="100%"
            src={`http://i.ytimg.com/vi/${
              this.props.score.video_id
            }/mqdefault.jpg`}
            alt="score"
          />
          <CardBody style={cardBodyInlineStyle}>
            <StyledCardText>
              <img
                src="/images/icon.png"
                width="26px"
                height="26px"
                style={{
                  borderRadius: '50%',
                }}
                alt="icon"
              />
              <Username>{this.props.score.username}</Username>
            </StyledCardText>
            <StyledCardText>
              <Comment>{this.props.score.comment}</Comment>
            </StyledCardText>
          </CardBody>
        </StyledCard>
      </Col>
    );
  }
}
